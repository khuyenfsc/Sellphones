//package com.sellphones.elasticsearch;
//
//import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.elasticsearch.client.elc.NativeQuery;
//import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
//import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
//import org.springframework.data.elasticsearch.core.query.Query;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//@RequiredArgsConstructor
//public class CustomProductDocumentRepository {
//
//    private final ElasticsearchOperations elasticsearchOperations;
//
//    public List<ProductDocument> getSuggestedProducts(String keyword){
//        Query query = NativeQuery.builder()
//                .withQuery(QueryBuilders.matchPhrasePrefix(m -> m
//                        .field("name")
//                        .query(keyword)))
//                .build();
//
//        return elasticsearchOperations.search(query, ProductDocument.class)
//                .stream()
//                .map(sh -> sh.getContent())
//                .toList();
//    }
//
//    public List<ProductDocument> getProductsByKeyword(String keyword, Pageable pageable, String sortType){
//        NativeQueryBuilder builder = NativeQuery.builder()
//                .withQuery(QueryBuilders.match(m -> m
//                        .field("name.partial")
//                        .query(keyword)))
//                .withPageable(pageable);
//
//        if(sortType != null){
//            if(sortType.equals("asc")){
//                builder = builder.withSort(Sort.by("minPrice").ascending());
//            }else if(sortType.equals("desc")){
//                builder = builder.withSort(Sort.by("minPrice").descending());
//            }
//        }
//
//        Query query = builder.build();
//
//        return elasticsearchOperations.search(query, ProductDocument.class)
//                .stream()
//                .map(sh -> sh.getContent())
//                .toList();
//    }
//}
