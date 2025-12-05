package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryRequest;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.order.admin.AdminShipmentListResponse;
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
import jakarta.validation.Valid;
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
    public PageResponse<AdminInventoryResponse> getInventories(AdminInventoryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Inventory> spec = AdminInventorySpecificationBuilder.build(request);

        Page<Inventory> inventoryPage = inventoryRepository.findAll(spec, pageable);
        List<Inventory> inventories = inventoryPage.getContent();
        List<AdminInventoryResponse> response = inventories.stream()
                .map(i -> modelMapper.map(i, AdminInventoryResponse.class))
                .toList();

        return PageResponse.<AdminInventoryResponse>builder()
                .result(response)
                .total(inventoryPage.getTotalElements())
                .totalPages(inventoryPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.VIEW')")
    public PageResponse<AdminInventoryResponse> getInventories(
        AdminInventoryFilterRequest request,
        Long warehouseId
    ) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Inventory> spec = AdminInventorySpecificationBuilder.buildWithWarehouseId(request, warehouseId);

        Page<Inventory> inventoryPage = inventoryRepository.findAll(spec, pageable);
        List<Inventory> inventories = inventoryPage.getContent();
        List<AdminInventoryResponse> response = inventories.stream()
                .map(i -> modelMapper.map(i, AdminInventoryResponse.class))
                .toList();

        return PageResponse.<AdminInventoryResponse>builder()
                .result(response)
                .total(inventoryPage.getTotalElements())
                .totalPages(inventoryPage.getTotalPages())
                .build();
    }

    @Override
    public AdminInventoryResponse getInventoryById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        return modelMapper.map(inventory, AdminInventoryResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.CREATE')")
    public void addInventory(AdminInventoryRequest request, Long warehouseId) {
        ProductVariant productVariant = productVariantRepository.findById(request.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));
        Inventory inventory = Inventory.builder()
                .productVariant(productVariant)
                .warehouse(warehouse)
                .quantity(request.getQuantity())
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
        try {
            inventory.setProductVariant(productVariant);
            inventory.setQuantity(request.getQuantity());
            inventoryRepository.save(inventory);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new AppException(ErrorCode.INVENTORY_ALREADY_EXISTS);
            }
        }
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.INVENTORIES.DELETE')")
    public void deleteInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));
        inventoryRepository.delete(inventory);
    }
}
