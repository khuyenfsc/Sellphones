package com.sellphones.service.inventory;

import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.Warehouse;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.inventory.StockEntry;
import com.sellphones.entity.inventory.Supplier;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.StockEntryMapper;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.inventory.StockEntryRepository;
import com.sellphones.repository.inventory.SupplierRepository;
import com.sellphones.repository.warehouse.WarehouseRepository;
import com.sellphones.specification.admin.AdminStockEntrySpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStockEntryServiceImpl implements AdminStockEntryService{

    private final StockEntryRepository stockEntryRepository;

    private final InventoryRepository inventoryRepository;

    private final SupplierRepository supplierRepository;

    private final WarehouseRepository warehouseRepository;

    private final StockEntryMapper stockEntryMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.VIEW')")
    public List<AdminStockEntryResponse> getStockEntries(AdminStockEntryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<StockEntry> spec = AdminStockEntrySpecificationBuilder.build(request);

        Page<StockEntry> stockEntryPage = stockEntryRepository.findAll(spec, pageable);

        return stockEntryPage.getContent().stream()
                .map(c -> modelMapper.map(c, AdminStockEntryResponse.class))
                .toList();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.CREATE')")
    public void addStockEntry(AdminStockEntryRequest request) {
        Inventory inventory = inventoryRepository.findById(request.getInventoryId()).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));

        StockEntry stockEntry = stockEntryMapper.mapToStockEntryEntity(request, inventory, supplier);
        stockEntry.setCreatedAt(LocalDateTime.now());
        stockEntryRepository.save(stockEntry);

        inventory.setQuantity(stockEntryRepository.sumQuantityByInventory(inventory.getId()));
        ProductVariant productVariant = inventory.getProductVariant();
        long totalStock = inventoryRepository.sumQuantityByProductVariantId(productVariant.getId());
        productVariant.setStock(totalStock);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.EDIT')")
    public void editStockEntry(AdminStockEntryRequest request, Long id) {
        StockEntry stockEntry = stockEntryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));
        Inventory inventory = inventoryRepository.findById(request.getInventoryId()).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));

        StockEntry newStockEntry = stockEntryMapper.mapToStockEntryEntity(request, inventory, supplier);
        newStockEntry.setCreatedAt(stockEntry.getCreatedAt());
        newStockEntry.setId(stockEntry.getId());
        newStockEntry.setCreatedAt(stockEntry.getCreatedAt());

        stockEntryRepository.save(newStockEntry);

        inventory.setQuantity(stockEntryRepository.sumQuantityByInventory(inventory.getId()));
        ProductVariant productVariant = inventory.getProductVariant();
        productVariant.setStock(inventoryRepository.sumQuantityByProductVariantId(productVariant.getId()));
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.DELETE')")
    public void deleteStockEntry(Long id) {
        StockEntry stockEntry = stockEntryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));
        Inventory inventory = stockEntry.getInventory();

        stockEntryRepository.delete(stockEntry);

        inventory.setQuantity(stockEntryRepository.sumQuantityByInventory(inventory.getId()));
        ProductVariant productVariant = inventory.getProductVariant();
        productVariant.setStock(inventoryRepository.sumQuantityByProductVariantId(productVariant.getId()));
    }
}
