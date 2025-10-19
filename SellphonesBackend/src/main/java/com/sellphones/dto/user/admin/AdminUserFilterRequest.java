package com.sellphones.dto.user.admin;

import com.sellphones.entity.user.Gender;
import com.sellphones.entity.user.Provider;
import com.sellphones.entity.user.RoleName;
import com.sellphones.entity.user.UserStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserFilterRequest {

    private String fullName;

    private String email;

    private UserStatus status;

    private RoleName roleName;

    private Gender gender;

    private Provider provider;

    private String sortType;

    @Min(0)
    private Integer page = 0;

    @Min(0)
    @Max(100)
    private Integer size = 5;

}
