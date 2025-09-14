package com.sellphones.repository.product;

import com.sellphones.entity.product.FilterOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilterOptionRepository extends JpaRepository<FilterOption, Long> {
    List<FilterOption> findByCategoryId(Long id);
}
