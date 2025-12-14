package com.sellphones.configuration;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.indices.CreateIndexRequest;
import co.elastic.clients.elasticsearch.indices.CreateIndexResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sellphones.elasticsearch.ProductDocument;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Configuration
@RequiredArgsConstructor
public class ElasticsearchIndexConfig {

    private final ElasticsearchOperations elasticsearchOperations;

    private final ElasticsearchClient elasticsearchClient;

    private final ObjectMapper objectMapper;

    @PostConstruct
    public void createIndexWithMapping() throws IOException {
        IndexOperations indexOperations = elasticsearchOperations.indexOps(ProductDocument.class);

        if(indexOperations.exists()){
            indexOperations.delete();
        }
        File file = ResourceUtils.getFile("classpath:analyzer.json");
        String json = Files.readString(file.toPath(), StandardCharsets.UTF_8);
        createIndex(indexOperations.getIndexCoordinates().getIndexName(), json);
    }

    private void createIndex(String indexName, String jsonMapping) throws IOException {
        CreateIndexRequest indexRequest = CreateIndexRequest.of(b -> b.index(indexName)
                .withJson(new StringReader(jsonMapping)));
        CreateIndexResponse indexResponse = elasticsearchClient.indices().create(indexRequest);
    }
}
