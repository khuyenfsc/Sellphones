package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.inventory.admin.AdminSupplierFilterRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierRequest;
import com.sellphones.dto.inventory.admin.AdminSupplierResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.Supplier;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.SupplierMapper;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.inventory.SupplierRepository;
import com.sellphones.specification.admin.AdminSupplierSpecificationBuilder;
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
public class AdminSupplierServiceImpl implements AdminSupplierService{

    private final SupplierRepository supplierRepository;

    private final AddressRepository addressRepository;

    private final SupplierMapper supplierMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.SUPPLIERS.VIEW')")
    public PageResponse<AdminSupplierResponse> getSuppliers(AdminSupplierFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Supplier> spec = AdminSupplierSpecificationBuilder.build(request);

        Page<Supplier> suppplierPage = supplierRepository.findAll(spec, pageable);
        List<Supplier> suppliers = suppplierPage.getContent();
        List<AdminSupplierResponse> response = suppliers.stream()
                .map(i -> modelMapper.map(i, AdminSupplierResponse.class))
                .toList();

        return PageResponse.<AdminSupplierResponse>builder()
                .result(response)
                .total(suppplierPage.getTotalElements())
                .totalPages(suppplierPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.SUPPLIERS.CREATE')")
    public void addSupplier(AdminSupplierRequest request) {
        Address address = addressRepository.findByIdAndAddressType(request.getAddressId(), AddressType.SUPPLIER).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        Supplier supplier = supplierMapper.mapToSupplierEntity(request, address);
        supplier.setCreatedAt(LocalDateTime.now());
        supplierRepository.save(supplier);
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.SUPPLIERS.EDIT')")
    public void editSupplier(AdminSupplierRequest request, Long id) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SUPPLIER_NOT_FOUND));
        Address address = addressRepository.findByIdAndAddressType(request.getAddressId(), AddressType.SUPPLIER).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        Supplier newSupplier = supplierMapper.mapToSupplierEntity(request, address);
        newSupplier.setId(id);
        newSupplier.setCreatedAt(supplier.getCreatedAt());
        supplierRepository.save(newSupplier);
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.SUPPLIERS.DELETE')")
    public void deleteSupplier(Long id) {
        supplierRepository.deleteById(id);
    }
}
