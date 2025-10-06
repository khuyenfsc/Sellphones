package com.sellphones.repository.product;

import com.sellphones.entity.product.FilterOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FilterOptionRepository extends JpaRepository<FilterOption, Long>, JpaSpecificationExecutor<FilterOption> {
    List<FilterOption> findByCategoryId(Long id);
}
