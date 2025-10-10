package com.sellphones.controller.address;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.address.AdminAddressFilterRequest;
import com.sellphones.dto.address.AdminAddressRequest;
import com.sellphones.dto.address.AdminAddressResponse;
import com.sellphones.service.address.admin.AdminAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/addresses")
public class AdminAddressController {

    private final AdminAddressService adminAddressService;

    @GetMapping
    public ResponseEntity<CommonResponse> getAddresses(AdminAddressFilterRequest request){
        List<AdminAddressResponse> response = adminAddressService.getAddresses(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-address")
    public ResponseEntity<CommonResponse> addAddress(@RequestBody @Valid AdminAddressRequest request) {
        adminAddressService.addAddress(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added address successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-address/{id}")
    public ResponseEntity<CommonResponse> editAttribute(@RequestBody @Valid AdminAddressRequest request, @PathVariable Long id) {
        adminAddressService.editAddress(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited address successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-address/{id}")
    public ResponseEntity<CommonResponse> deleteAttribute(@PathVariable Long id) {
        adminAddressService.deleteAddress(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted address successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
