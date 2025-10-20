package com.sellphones.dto.product.admin;

import com.sellphones.dto.product.CommentUserResponse;
import com.sellphones.entity.product.CommentStatus;
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

    private CommentStatus status;

    private Boolean isReplied;

    private AdminComment_ProductResponse product;

    private AdminParentCommentResponse parentComment;

    private LocalDateTime createdAt;

}
