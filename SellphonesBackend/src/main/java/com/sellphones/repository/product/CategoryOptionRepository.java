package com.sellphones.repository.product;

import com.sellphones.entity.product.CategoryOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface CategoryOptionRepository extends JpaRepository<CategoryOption, Long>, JpaSpecificationExecutor<CategoryOption> {
}
