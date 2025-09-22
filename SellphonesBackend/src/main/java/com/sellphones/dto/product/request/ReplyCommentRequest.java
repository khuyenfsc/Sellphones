package com.sellphones.dto.product.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReplyCommentRequest {

    private Long parentId;

    private String content;


}
