package com.sellphones.service.inventory;

import com.sellphones.dto.inventory.admin.AdminInventoryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.Warehouse;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.inventory.StockEntryRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.warehouse.WarehouseRepository;
import com.sellphones.specification.admin.AdminInventorySpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
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
public class AdminInventoryServiceImpl implements AdminInventoryService{

    private final InventoryRepository inventoryRepository;

    private final ProductVariantRepository productVariantRepository;

    private final WarehouseRepository warehouseRepository;

    private final StockEntryRepository stockEntryRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.VIEW')")
    public List<AdminInventoryResponse> getInventories(AdminInventoryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "quantity");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Inventory> spec = AdminInventorySpecificationBuilder.build(request);

        Page<Inventory> inventoryPage = inventoryRepository.findAll(spec, pageable);

        return inventoryPage.getContent().stream()
                .map(c -> modelMapper.map(c, AdminInventoryResponse.class))
                .toList();
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.CREATE')")
    public void addInventory(AdminInventoryRequest request) {
        ProductVariant productVariant = productVariantRepository.findById(request.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId()).orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));
        Inventory inventory = Inventory.builder()
                .productVariant(productVariant)
                .warehouse(warehouse)
                .createdAt(LocalDateTime.now())
                .build();

        try {
            inventoryRepository.save(inventory);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new AppException(ErrorCode.INVENTORY_ALREADY_EXISTS);
            }
        }
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.EDIT')")
    public void editInventory(AdminInventoryRequest request, Long id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        ProductVariant productVariant = productVariantRepository.findById(request.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId()).orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));
        try {
            inventory.setProductVariant(productVariant);
            inventory.setWarehouse(warehouse);
            inventoryRepository.save(inventory);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new AppException(ErrorCode.INVENTORY_ALREADY_EXISTS);
            }
        }
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.EDIT')")
    public void deleteInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        stockEntryRepository.deleteByInventory_Id(inventory.getId());
        inventoryRepository.delete(inventory);
    }
}
