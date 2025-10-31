package com.sellphones.dto.user;

import com.sellphones.entity.user.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicUserResponse {
    private Long id;

    private String fullName;
}
