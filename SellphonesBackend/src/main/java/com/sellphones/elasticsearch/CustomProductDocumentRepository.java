package com.sellphones.elasticsearch;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.json.JsonData;
import com.sellphones.dto.product.admin.AdminProductFilterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
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
                builder = builder.withSort(Sort.by("minPrice").ascending());
            }else if(sortType.equals("desc")){
                builder = builder.withSort(Sort.by("minPrice").descending());
            }
        }

        Query query = builder.build();

        return elasticsearchOperations.search(query, ProductDocument.class)
                .stream()
                .map(sh -> sh.getContent())
                .toList();
    }

    public List<ProductDocument> getProductsWithAdminAuthority(AdminProductFilterRequest request){
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
                queryBuilder = queryBuilder.withSort(Sort.by("minPrice").ascending());
            }else if(request.getSortType().equals("desc")){
                queryBuilder = queryBuilder.withSort(Sort.by("minPrice").descending());
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
            System.out.println("min price " + request.getPrice().doubleValue());
            boolBuilder.filter(QueryBuilders.range(r -> r
                    .number(num -> num.field("min_price").lte(request.getPrice().doubleValue()))
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
}
