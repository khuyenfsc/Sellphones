package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminStockEntryRequest;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.StockEntry;
import com.sellphones.entity.product.Supplier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class StockEntryMapper {

    public StockEntry mapToStockEntryEntity(AdminStockEntryRequest request, ProductVariant productVariant, Supplier supplier){
        StockEntry stockEntry = StockEntry.builder()
                .productVariant(productVariant)
                .purchasePrice(new BigDecimal(request.getPurchasePrice()))
                .importDate(request.getImportDate())
                .supplier(supplier)
                .quantity(request.getQuantity())
                .createdAt(LocalDateTime.now())
                .build();
        return stockEntry;
    }

}
