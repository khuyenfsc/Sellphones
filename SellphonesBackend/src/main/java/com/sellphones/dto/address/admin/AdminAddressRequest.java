package com.sellphones.dto.address.admin;

import com.sellphones.dto.address.BaseAddressRequest;
import com.sellphones.entity.address.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddressRequest extends BaseAddressRequest {

    @NotNull
    private AddressType addressType;

}
