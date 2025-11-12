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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/attributes")
@RequiredArgsConstructor
public class AdminAttributeController {

    private final AdminAttributeService adminAttributeService;

    @GetMapping
    public ResponseEntity<CommonResponse> getAttributes(@Valid AdminAttributeFilterRequest request){
        PageResponse<AdminAttributeResponse> response = adminAttributeService.getAttributes(request);
        Map<String, Object> map = new HashMap<>();
        map.put("attributes", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-attribute")
    public ResponseEntity<CommonResponse> createAttribute(@RequestBody @Valid AdminAttributeRequest request) {
        adminAttributeService.addAttribute(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-attribute/{id}")
    public ResponseEntity<CommonResponse> editAttribute(@RequestBody @Valid AdminAttributeRequest request, @PathVariable Long id) {
        adminAttributeService.editAttribute(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-attribute/{id}")
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
    public ResponseEntity<CommonResponse> getAttributeValues(@Valid AdminAttributeValueFilterRequest request,@PathVariable Long attributeId){
        PageResponse<AdminAttributeValueResponse> response = adminAttributeService.getAttributeValues(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("values", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/{attributeId}/create-value")
    public ResponseEntity<CommonResponse> addAttributeValue(@RequestBody AdminAttributeValueRequest request, @PathVariable Long attributeId) {
        adminAttributeService.addAttributeValue(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-value/{attributeValueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@RequestBody AdminAttributeValueRequest request, @PathVariable Long attributeValueId) {
        adminAttributeService.editAttributeValue(request, attributeValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-value/{attributeValueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@PathVariable Long attributeValueId) {
        adminAttributeService.deleteAttributeValue(attributeValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
