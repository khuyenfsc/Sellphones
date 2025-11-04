package com.sellphones.controller.promotion.admin;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.PageResponse;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerFilterRequest;
import com.sellphones.dto.promotion.admin.AdminPromotionBannerResponse;
import com.sellphones.service.promotion.admin.AdminPromotionBannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/promotion-banners")
public class AdminPromotionBannerController {

    private final AdminPromotionBannerService adminPromotionBannerService;

    @GetMapping
    public ResponseEntity<CommonResponse> getBanners(AdminPromotionBannerFilterRequest request){
        PageResponse<AdminPromotionBannerResponse> response = adminPromotionBannerService.getBanners(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PostMapping("/create-promotion-banner")
    public ResponseEntity<CommonResponse> createPromotionBanner(
            @RequestPart("banner") String bannerJson,
            @RequestPart(name = "file", required = false) MultipartFile imageFile
    ){

        adminPromotionBannerService.createBanner(bannerJson, imageFile);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Created promotion banner successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @PutMapping("/edit-promotion-banner/{id}")
    public ResponseEntity<CommonResponse> editPromotionBanner(
            @RequestPart("banner") String bannerJson,
            @RequestPart(name = "file", required = false) MultipartFile imageFile,
            @PathVariable Long id
    ){
        adminPromotionBannerService.editBanner(bannerJson, imageFile, id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Edited promotion banner successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @DeleteMapping("/delete-promotion-banner/{id}")
    public ResponseEntity<CommonResponse> deleteProduct(@PathVariable Long id){
        adminPromotionBannerService.deleteBanner(id);
        Map<String, Object> map = new HashMap<>();
        map.put("result", "Deleted promotion banner successfully");

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }
}
