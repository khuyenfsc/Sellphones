package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.product.admin.AdminStockEntryRequest;
import com.sellphones.dto.product.admin.AdminStockEntryResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.product.ProductVariant;
import com.sellphones.entity.product.StockEntry;
import com.sellphones.entity.product.Supplier;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.StockEntryMapper;
import com.sellphones.repository.product.ProductVariantRepository;
import com.sellphones.repository.product.StockEntryRepository;
import com.sellphones.repository.product.SupplierRepository;
import com.sellphones.specification.admin.AdminStockEntrySpecificationBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStockEntryServiceImpl implements AdminStockEntryService{

    private final StockEntryRepository stockEntryRepository;

    private final ProductVariantRepository productVariantRepository;

    private final SupplierRepository supplierRepository;

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
        ProductVariant productVariant = productVariantRepository.findById(request.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));
        StockEntry stockEntry = stockEntryMapper.mapToStockEntryEntity(request, productVariant, supplier);

        stockEntryRepository.save(stockEntry);

        productVariant.setStock(productVariant.getStock() + stockEntry.getQuantity());
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.EDIT')")
    public void editStockEntry(AdminStockEntryRequest request, Long id) {
        StockEntry stockEntry = stockEntryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));
        ProductVariant productVariant = productVariantRepository.findById(request.getProductVariantId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));
        Supplier supplier = supplierRepository.findById(request.getSupplierId()).orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));

        Long newStock = productVariant.getStock() - stockEntry.getQuantity() + request.getQuantity();

        StockEntry newStockEntry = stockEntryMapper.mapToStockEntryEntity(request, productVariant, supplier);
        newStockEntry.setCreatedAt(stockEntry.getCreatedAt());
        newStockEntry.setId(stockEntry.getId());

        stockEntryRepository.save(newStockEntry);

        productVariant.setStock(newStock > 0 ? newStock : 0 );
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.STOCK_ENTRIES.DELETE')")
    public void deleteStockEntry(Long id) {
        StockEntry stockEntry = stockEntryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.STOCK_ENTRY_NOT_FOUND));
        ProductVariant productVariant = productVariantRepository.findById(stockEntry.getProductVariant().getId()).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_VARIANT_NOT_FOUND));

        stockEntryRepository.delete(stockEntry);

        Long newStock = productVariant.getStock() - stockEntry.getQuantity();
        productVariant.setStock(newStock>0?newStock:0);
    }
}
