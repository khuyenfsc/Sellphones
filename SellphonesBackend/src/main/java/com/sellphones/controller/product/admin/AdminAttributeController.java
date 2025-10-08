package com.sellphones.controller.product.admin;

import com.sellphones.dto.CommonResponse;
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
        List<AdminAttributeResponse> responses = adminAttributeService.getAttributes(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/add-attribute")
    public ResponseEntity<CommonResponse> addAttribute(@RequestBody @Valid AdminAttributeRequest request) {
        adminAttributeService.addAttribute(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-attribute/{id}")
    public ResponseEntity<CommonResponse> editAttribute(@RequestBody @Valid AdminAttributeRequest request, @PathVariable Long id) {
        adminAttributeService.editAttribute(request, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-attribute/{id}")
    public ResponseEntity<CommonResponse> deleteAttribute(@PathVariable Long id) {
        adminAttributeService.deleteAttribute(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted attribute successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @GetMapping("/{attributeId}/attribute-values")
    public ResponseEntity<CommonResponse> getAttributeValues(@Valid AdminAttributeValueFilterRequest request,@PathVariable Long attributeId){
        List<AdminAttributeValueResponse> responses = adminAttributeService.getAttributeValues(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", responses);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PostMapping("/{attributeId}/add-attribute-value")
    public ResponseEntity<CommonResponse> addAttributeValue(@RequestBody AdminAttributeValueRequest request, @PathVariable Long attributeId) {
        adminAttributeService.addAttributeValue(request, attributeId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Added attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @PutMapping("/edit-attribute-value/{attributeValueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@RequestBody AdminAttributeValueRequest request, @PathVariable Long attributeValueId) {
        adminAttributeService.editAttributeValue(request, attributeValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }

    @DeleteMapping("/delete-attribute-value/{attributeValueId}")
    public ResponseEntity<CommonResponse> editAttributeValue(@PathVariable Long attributeValueId) {
        adminAttributeService.deleteAttributeValue(attributeValueId);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted attribute value successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(map));
    }
}
