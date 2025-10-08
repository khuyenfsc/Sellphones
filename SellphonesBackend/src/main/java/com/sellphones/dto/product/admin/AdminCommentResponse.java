package com.sellphones.dto.product.admin;

import com.sellphones.dto.product.response.CommentUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCommentResponse {

    private Long id;

    private CommentUserResponse user;

    private String content;

    private AdminCommentProductResponse product;

    private LocalDateTime createdAt;

}
