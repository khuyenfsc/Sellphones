package com.sellphones.specification.admin;

import com.sellphones.dto.promotion.admin.AdminPromotionBannerFilterRequest;
import com.sellphones.entity.promotion.BannerStatus;
import com.sellphones.entity.promotion.BannerType;
import com.sellphones.entity.promotion.PromotionBanner;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class AdminPromotionBannerSpecificationBuilder {
    public static Specification<PromotionBanner> build(AdminPromotionBannerFilterRequest request){
        Specification<PromotionBanner> spec = (root, query, cb) -> cb.conjunction();

        if(request.getName() != null){
            spec = spec.and(hasNameContain(request.getName()));
        }

        if(request.getBannerType() != null){
            spec = spec.and(hasBannerType(request.getBannerType()));
        }

        if(request.getStatus() != null){
            spec = spec.and(hasStatus(request.getStatus()));
        }

        if(request.getStartDate() != null && request.getEndDate() != null){
            spec = spec.and(hasDateBetween(request.getStartDate(), request.getEndDate()));
        }

        return spec;
    }



    public static Specification<PromotionBanner> hasNameContain(String name){
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }

    public static Specification<PromotionBanner> hasBannerType(BannerType bannerType){
        return (root, query, cb) -> cb.equal(root.get("bannerType"), bannerType);
    }

    public static Specification<PromotionBanner> hasStatus(BannerStatus status){
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    public static Specification<PromotionBanner> hasDateBetween(LocalDate startDate, LocalDate endDate){
        return (root, query, cb) -> cb.between(root.get("createdAt"), startDate.atStartOfDay(), endDate.atTime(LocalTime.MAX));
    }


}
