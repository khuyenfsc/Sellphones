package com.sellphones.mapper;

import com.sellphones.dto.inventory.admin.AdminStockEntryRequest;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.Warehouse;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.inventory.StockEntry;
import com.sellphones.entity.inventory.Supplier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class StockEntryMapper {

    public StockEntry mapToStockEntryEntity(AdminStockEntryRequest request, Inventory inventory, Supplier supplier){
        StockEntry stockEntry = StockEntry.builder()
                .inventory(inventory)
                .purchasePrice(new BigDecimal(request.getPurchasePrice()))
                .importDate(request.getImportDate())
                .supplier(supplier)
                .quantity(request.getQuantity())
                .createdAt(LocalDateTime.now())
                .build();
        return stockEntry;
    }

}
