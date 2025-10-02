package com.sellphones.repository.product;

import com.sellphones.entity.product.CategoryOptionValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CategoryOptionValueRepository extends JpaRepository<CategoryOptionValue, Long>, JpaSpecificationExecutor<CategoryOptionValue> {
}
