package com.sellphones.dto.product.response;

import com.sellphones.entity.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentUserResponse {
    private Long id;

    private String fullName;

    private String avatarUrl;

    private Role role;
}
