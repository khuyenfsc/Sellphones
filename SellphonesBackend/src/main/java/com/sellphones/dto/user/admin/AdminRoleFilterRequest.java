package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.RoleName;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRoleFilterRequest {

    private String name;

    private RoleName roleName;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(0)
    @Max(100)
    private Integer size = 5;

}
