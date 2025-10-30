package com.sellphones.elasticsearch;

import co.elastic.clients.elasticsearch._types.query_dsl.*;
import com.sellphones.dto.product.admin.AdminProductFilter_Request;
import com.sellphones.entity.product.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.DeleteQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomProductDocumentRepository {

    private final ElasticsearchOperations elasticsearchOperations;

    public List<ProductDocument> getSuggestedProducts(String keyword){
        Query query = NativeQuery.builder()
                .withQuery(QueryBuilders.matchPhrasePrefix(m -> m
                        .field("name")
                        .query(keyword)))
                .withMaxResults(5)
                .build();

        return elasticsearchOperations.search(query, ProductDocument.class)
                .stream()
                .map(sh -> sh.getContent())
                .toList();
    }

    public List<ProductDocument> getProductsByKeyword(String keyword, Pageable pageable, String sortType){
        NativeQueryBuilder builder = NativeQuery.builder()
                .withQuery(QueryBuilders.match(m -> m
                        .field("name.partial")
                        .query(keyword)))
                .withPageable(pageable);

        if(sortType != null){
            if(sortType.equals("asc")){
                builder = builder.withSort(Sort.by("currentPrice").ascending());
            }else if(sortType.equals("desc")){
                builder = builder.withSort(Sort.by("currentPrice").descending());
            }
        }

        Query query = builder.build();

        return elasticsearchOperations.search(query, ProductDocument.class)
                .stream()
                .map(sh -> sh.getContent())
                .toList();
    }

    public List<ProductDocument> getProductsWithAdminAuthority(AdminProductFilter_Request request){
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        NativeQueryBuilder queryBuilder = NativeQuery.builder()
                .withPageable(pageable);

        if (request.getKeyword() != null && !request.getKeyword().isBlank()) {
            queryBuilder.withQuery(QueryBuilders.match(m -> m
                    .field("name.partial")
                    .query(request.getKeyword())
            ));
        } else {
            queryBuilder.withQuery(QueryBuilders.matchAll(m -> m));
        }

        if(request.getSortType() != null){
            if(request.getSortType().equals("asc")){
                queryBuilder = queryBuilder.withSort(Sort.by("currentPrice").ascending());
            }else if(request.getSortType().equals("desc")){
                queryBuilder = queryBuilder.withSort(Sort.by("currentPrice").descending());
            }
        }

        co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery.Builder boolBuilder = QueryBuilders.bool();

        if (request.getId() != null) {
            boolBuilder.filter(QueryBuilders.term(t -> t
                    .field("id")
                    .value(request.getId())
            ));
        }

        if (request.getPrice() != null) {
            boolBuilder.filter(QueryBuilders.range(r -> r
                    .number(num -> num.field("current_price").lte(request.getPrice().doubleValue()))
            ));
        }

        if (request.getCategoryName() != null && !request.getCategoryName().isBlank()) {
            boolBuilder.filter(QueryBuilders.term(t -> t
                    .field("category_name.keyword")
                    .value(request.getCategoryName())
            ));
        }

        if (request.getBrandName() != null && !request.getBrandName().isBlank()) {
            boolBuilder.filter(QueryBuilders.term(t -> t
                    .field("brand_name.keyword")
                    .value(request.getBrandName())
            ));
        }

        queryBuilder.withFilter(boolBuilder.build()._toQuery());

        return elasticsearchOperations.search(queryBuilder.build(), ProductDocument.class).stream()
                .map(sh -> sh.getContent())
                .toList();
    }

    public List<ProductDocument> getSimilarProducts(Product product){

        double currentPrice = product.getThumbnailProduct().getCurrentPrice().doubleValue();
        double minPrice = currentPrice * 0.9;  // -10%
        double maxPrice = currentPrice * 1.1;  // +10%

        co.elastic.clients.elasticsearch._types.query_dsl.Query moreLikeThisQuery = QueryBuilders
                .moreLikeThis(likeThisConfig -> likeThisConfig
                        .fields("name")
                        .like(Like.of(likeConfig -> likeConfig
                                .document(LikeBuilders.document()
                                        .index("products")
                                        .id(String.valueOf(product.getId()))
                                        .build()
                                ))
                        )
                        .minTermFreq(1)
                        .minDocFreq(1)
                        .maxQueryTerms(25)
                );

        co.elastic.clients.elasticsearch._types.query_dsl.Query rangeQuery = QueryBuilders
                .range(rangeConfig -> rangeConfig
                        .number(nbConfig -> nbConfig
                                .field("current_price")
                                .gte(minPrice)
                                .lte(maxPrice)
                        )
                );

        co.elastic.clients.elasticsearch._types.query_dsl.Query boolQuery = QueryBuilders.bool()
                .must(moreLikeThisQuery, rangeQuery)
                .filter(QueryBuilders.term(termConfig -> termConfig
                        .field("category_name.keyword")
                        .value(product.getCategory().getName())
                ))
                .mustNot(QueryBuilders.term(termConfig -> termConfig
                        .field("id")
                        .value(product.getId())
                ))
                .build()._toQuery();

        co.elastic.clients.elasticsearch._types.query_dsl.Query functionScoreQuery = QueryBuilders.functionScore(f -> f
                .query(boolQuery)
                .scoreMode(FunctionScoreMode.Multiply)
                .boostMode(FunctionBoostMode.Sum)
        );

        NativeQuery query = NativeQuery.builder()
                .withQuery(functionScoreQuery)
                .withMaxResults(5)
                .build();

        return elasticsearchOperations.search(query, ProductDocument.class)
                .stream().map(sh -> sh.getContent())
                .toList();
    }

    public void deleteProduct(Long productId){
        Criteria criteria = new Criteria("id").is(productId);
        Query query = new CriteriaQuery(criteria);
        DeleteQuery deleteQuery = DeleteQuery.builder(query).build();
        elasticsearchOperations.delete(deleteQuery, ProductDocument.class, IndexCoordinates.of("products"));
    }
}
