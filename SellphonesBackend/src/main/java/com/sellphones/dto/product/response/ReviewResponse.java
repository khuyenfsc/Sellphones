package com.sellphones.dto.product.response;

import com.sellphones.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {

    private ReviewUserResponse user;

    private String content;

    private int ratingScore;

    private List<String> imageUrls;

}
