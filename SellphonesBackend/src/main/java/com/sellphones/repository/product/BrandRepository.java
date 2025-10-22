package com.sellphones.repository.product;

import com.sellphones.entity.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Set;

public interface BrandRepository extends JpaRepository<Brand, Long>, JpaSpecificationExecutor<Brand> {
    Set<Brand> findByCategories_Id(Long categoryId);
    Set<Brand> findByCategories_Name(String categoryName);
}
