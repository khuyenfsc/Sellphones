package com.sellphones.dto.product.admin;


import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductFilter_FilterRequest {

    private String keyword;

//    @JsonSerialize(using = LocalDateSerializer.class)
//    @JsonDeserialize(using = LocalDateDeserializer.class)
//    private LocalDate startDate;
//
//    @JsonSerialize(using = LocalDateSerializer.class)
//    @JsonDeserialize(using = LocalDateDeserializer.class)
//    private LocalDate endDate;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(1)
    private Integer size = 5;

}
