package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.service.product.admin.AdminAttributeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/attributes")
@RequiredArgsConstructor
public class AdminAttributeController {

    private final AdminAttributeService adminAttributeService;

    @GetMapping
    public ResponseEntity<CommonResponse> getAttributes(@Valid AdminAttribute_FilterRequest request){
        PageResponse<AdminAttributeResponse> response = adminAttributeService.getAttributes(request);
        Map<String, Object> map = new HashMap<>();
        map.put("attributes", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createAttribute(@RequestBody @Valid AdminAttributeRequest request) {
        adminAttributeService.createAttribute(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CommonResponse> updateAttribute(@RequestBody @Valid AdminAttributeRequest request, @PathVariable Long id) {
        adminAttributeService.updateAttribute(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse> deleteAttribute(@PathVariable Long id) {
        adminAttributeService.deleteAttribute(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse> getAttributeById(@PathVariable Long id){
        AdminAttributeResponse response = adminAttributeService.getAttributeById(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/{attributeId}/values")
    public ResponseEntity<CommonResponse> getValues(@Valid AdminAttributeValue_FilterRequest request, @PathVariable Long attributeId){
        PageResponse<AdminAttributeValueResponse> response = adminAttributeService.getValues(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("values", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{attributeId}/values/create")
    public ResponseEntity<CommonResponse> createValue(@RequestBody @Valid AdminAttributeValueRequest request, @PathVariable Long attributeId) {
        adminAttributeService.createValue(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/values/update/{valueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@RequestBody AdminAttributeValueRequest request, @PathVariable Long valueId) {
        adminAttributeService.updateValue(request, valueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Updated attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/values/delete/{valueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@PathVariable Long valueId) {
        adminAttributeService.deleteAttributeValue(valueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
