package com.sellphones.repository.product;

import com.sellphones.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.awt.print.Pageable;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product>{

    List<Product> findFirst10ByCategoryIdAndIsFeatured(Long id, Boolean isFeatured);

}
