package com.sellphones.elasticsearch;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(indexName = "products")
public class ProductDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(name = "thumbnail", type = FieldType.Text)
    private String thumbnail;

    @Field(type = FieldType.Text)
    private String description;

    @Field(name ="min_price", type = FieldType.Long)
    private Long minPrice;

    @Field(name ="category_name", type = FieldType.Text)
    private String categoryName;

    @Field(name ="brand_name", type = FieldType.Text)
    private String brandName;
}
