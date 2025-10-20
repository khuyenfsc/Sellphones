package com.sellphones.dto.product;

import com.sellphones.entity.user.RoleName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRoleResponse {
    private RoleName roleName;
}
