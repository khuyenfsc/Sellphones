package com.sellphones.mapper;

import com.sellphones.dto.inventory.admin.AdminCreateStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminUpdateStockEntryRequest;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.StockEntry;
import com.sellphones.entity.inventory.Supplier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class StockEntryMapper {

    public StockEntry mapToCreatedStockEntryEntity(AdminCreateStockEntryRequest request, Inventory inventory, Supplier supplier){
        StockEntry stockEntry = StockEntry.builder()
                .inventory(inventory)
                .purchasePrice(request.getPurchasePrice())
                .importDate(LocalDate.now())
                .supplier(supplier)
                .quantity(request.getQuantity())
                .createdAt(LocalDateTime.now())
                .build();
        return stockEntry;
    }

    public StockEntry mapToEditedStockEntryEntity(AdminUpdateStockEntryRequest request){
        StockEntry stockEntry = StockEntry.builder()
                .purchasePrice(request.getPurchasePrice())
                .quantity(request.getQuantity())
                .build();
        return stockEntry;
    }

}
