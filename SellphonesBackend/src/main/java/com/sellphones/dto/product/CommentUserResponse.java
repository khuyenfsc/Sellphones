package com.sellphones.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentUserResponse {
    private Long id;

    private String fullName;

    private CommentRoleResponse role;

}
