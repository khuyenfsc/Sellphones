package com.sellphones.service.inventory;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.*;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.inventory.Supplier;
import com.sellphones.entity.inventory.Warehouse;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.repository.warehouse.WarehouseRepository;
import com.sellphones.specification.admin.AdminWarehouseSpecificationBuilder;
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
public class AdminWarehouseServiceImpl implements AdminWarehouseService{

    private final WarehouseRepository warehouseRepository;

    private final AddressRepository addressRepository;

    private final ModelMapper modelMapper;

    private final AddressMapper addressMapper;

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.WAREHOUSES.VIEW')")
    public PageResponse<AdminWarehouseResponse> getWarehouses(AdminWarehouseFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Warehouse> spec = AdminWarehouseSpecificationBuilder.build(request);

        Page<Warehouse> warehousePage = warehouseRepository.findAll(spec, pageable);
        List<Warehouse> warehouses = warehousePage.getContent();
        List<AdminWarehouseResponse> response = warehouses.stream()
                .map(i -> modelMapper.map(i, AdminWarehouseResponse.class))
                .toList();

        return PageResponse.<AdminWarehouseResponse>builder()
                .result(response)
                .total(warehousePage.getTotalElements())
                .totalPages(warehousePage.getTotalPages())
                .build();
    }

    @Override
    public AdminWarehouseResponse getWarehouseById(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));
        return modelMapper.map(warehouse, AdminWarehouseResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.WAREHOUSES.CREATE')")
    public void addWarehouse(AdminWarehouseRequest request) {
        Address address = addressMapper.mapToAddressEntity(request.getAddress());
        Warehouse warehouse = Warehouse.builder()
                .name(request.getName())
                .address(address)
                .createdAt(LocalDateTime.now())
                .build();

        try {
            warehouseRepository.save(warehouse);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new AppException(ErrorCode.WAREHOUSE_ALREADY_EXISTS);
            }
        }
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.WAREHOUSES.EDIT')")
    public void editWarehouse(AdminWarehouseRequest request, Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));
        Address address = warehouse.getAddress();

        warehouse.setName(request.getName());

        Address editedAddress = addressMapper.mapToAddressEntity(request.getAddress());
        editedAddress.setAddressType(AddressType.WAREHOUSE);
        editedAddress.setId(address.getId());
        editedAddress.setCreatedAt(address.getCreatedAt());

        warehouse.setAddress(editedAddress);
        try {
            warehouseRepository.save(warehouse);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                throw new AppException(ErrorCode.WAREHOUSE_ALREADY_EXISTS);
            }
        }
    }

    @Override
    @PreAuthorize("hasAuthority('INVENTORY.WAREHOUSES.DELETE')")
    public void deleteWarehouse(Long id) {
        warehouseRepository.deleteById(id);
    }
}
