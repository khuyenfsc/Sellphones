package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private Long id;

    private ReviewUserResponse user;

    private String content;

    private int ratingScore;

    private List<String> imageNames;

    private LocalDateTime createdAt;
}
