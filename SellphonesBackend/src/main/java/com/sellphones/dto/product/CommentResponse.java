package com.sellphones.dto.product;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {

    private Long id;

    private CommentUserResponse user;

    private String content;

//    @JsonInclude(JsonInclude.Include.NON_NULL)
//    private List<CommentResponse> childComments;

    private LocalDateTime createdAt;
}
