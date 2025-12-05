package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.inventory.admin.AdminCreateStockEntryRequest;
import com.sellphones.dto.inventory.admin.AdminStockEntryResponse;
import com.sellphones.dto.inventory.admin.AdminUpdateStockEntryRequest;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.inventory.StockEntry;
import com.sellphones.entity.inventory.Supplier;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.StockEntryMapper;
import com.sellphones.repository.inventory.InventoryRepository;
import com.sellphones.repository.inventory.StockEntryRepository;
import com.sellphones.repository.inventory.SupplierRepository;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.specification.admin.AdminStockEntrySpecificationBuilder;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    private final ProductVariantRepository productVariantRepository;

    private final StockEntryMapper stockEntryMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.VIEW')")
    public PageResponse<AdminStockEntryResponse> getStockEntriesBySupplierId(@Valid AdminStockEntryFilterRequest request, Long supplierId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<StockEntry> spec = AdminStockEntrySpecificationBuilder.buildWithSupplierId(request, supplierId);

        Page<StockEntry> stockEntryPage = stockEntryRepository.findAll(spec, pageable);
        List<StockEntry> stockEntries = stockEntryPage.getContent();
        List<AdminStockEntryResponse> response = stockEntries.stream()
                .map(i -> modelMapper.map(i, AdminStockEntryResponse.class))
                .toList();

        return PageResponse.<AdminStockEntryResponse>builder()
                .result(response)
                .total(stockEntryPage.getTotalElements())
                .totalPages(stockEntryPage.getTotalPages())
                .build();
    }

    @Override
    public PageResponse<AdminStockEntryResponse> getStockEntriesByInventoryId(AdminStockEntryFilterRequest request, Long inventoryId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<StockEntry> spec = AdminStockEntrySpecificationBuilder.buildWithInventoryId(request, inventoryId);

        Page<StockEntry> stockEntryPage = stockEntryRepository.findAll(spec, pageable);
        List<StockEntry> stockEntries = stockEntryPage.getContent();
        List<AdminStockEntryResponse> response = stockEntries.stream()
                .map(i -> modelMapper.map(i, AdminStockEntryResponse.class))
                .toList();

        return PageResponse.<AdminStockEntryResponse>builder()
                .result(response)
                .total(stockEntryPage.getTotalElements())
                .totalPages(stockEntryPage.getTotalPages())
                .build();
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.CREATE')")
    public void addStockEntry(AdminCreateStockEntryRequest request, Long supplierId) {
        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_NOT_FOUND));

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));

        long delta = request.getQuantity();

        StockEntry entry = stockEntryMapper.mapToCreatedStockEntryEntity(request, inventory, supplier);
        entry.setCreatedAt(LocalDateTime.now());
        stockEntryRepository.save(entry);

        int updated = inventoryRepository.safeIncreaseQuantity(inventory.getId(), delta);
        if (updated == 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }

        ProductVariant variant = inventory.getProductVariant();
        productVariantRepository.safeIncreaseStock(variant.getId(), delta);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.EDIT')")
    public void editStockEntry(AdminUpdateStockEntryRequest request, Long id) {
        StockEntry oldEntry = stockEntryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));
        Inventory inventory = oldEntry.getInventory();

        long oldQty = oldEntry.getQuantity();
        long newQty = request.getQuantity();
        long delta = newQty - oldQty;

        if (inventory.getQuantity() + delta < 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }

        oldEntry.setQuantity(newQty);
        oldEntry.setPurchasePrice(request.getPurchasePrice());
        stockEntryRepository.save(oldEntry);

        int updated = inventoryRepository.safeIncreaseQuantity(inventory.getId(), delta);
        if (updated == 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }

        ProductVariant variant = inventory.getProductVariant();
        productVariantRepository.safeIncreaseStock(variant.getId(), delta);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.DELETE')")
    public void deleteStockEntry(Long id) {
        StockEntry entry = stockEntryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));

        Inventory inventory = entry.getInventory();
        ProductVariant variant = inventory.getProductVariant();

        long delta = -entry.getQuantity();

        if (inventory.getQuantity() + delta < 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }
        System.out.println("deleteStockEntry " + id);
        stockEntryRepository.delete(entry);
        stockEntryRepository.flush();

        int updated1 = inventoryRepository.safeIncreaseQuantity(inventory.getId(), delta);
        if (updated1 == 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }

        int updated2 = productVariantRepository.safeIncreaseStock(variant.getId(), delta);
        if (updated2 == 0) {
            throw new AppException(ErrorCode.INVENTORY_QUANTITY_CANNOT_BE_NEGATIVE);
        }
    }
}
