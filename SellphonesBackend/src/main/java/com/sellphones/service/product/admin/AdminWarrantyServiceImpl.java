package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.product.admin.AdminWarrantyFilterRequest;
import com.sellphones.dto.product.admin.AdminWarrantyRequest;
import com.sellphones.dto.product.admin.AdminWarrantyResponse;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.product.Warranty;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.WarrantyRepository;
import com.sellphones.specification.admin.AdminWarrantySpecificationBuilder;
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
public class AdminWarrantyServiceImpl implements AdminWarrantyService {

    private final WarrantyRepository warrantyRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CATALOG.WARRANTIES.VIEW')")
    public PageResponse<AdminWarrantyResponse> getWarranties(AdminWarrantyFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "price", "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Warranty> spec = AdminWarrantySpecificationBuilder.build(request);

        Page<Warranty> warrantyPage = warrantyRepository.findAll(spec, pageable);
        List<Warranty> warranties = warrantyPage.getContent();
        List<AdminWarrantyResponse> response = warranties.stream()
                .map(w -> modelMapper.map(w, AdminWarrantyResponse.class))
                .toList();

        return PageResponse.<AdminWarrantyResponse>builder()
                .result(response)
                .total(warrantyPage.getTotalElements())
                .totalPages(warrantyPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.WARRANTIES.CREATE')")
    public void addWarranty(AdminWarrantyRequest request) {
        Warranty warranty = Warranty.builder()
                .name(request.getName())
                .months(request.getMonths())
                .price(new BigDecimal(request.getPrice()))
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .build();

        warrantyRepository.save(warranty);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.WARRANTIES.EDIT')")
    public void editWarranty(AdminWarrantyRequest request, Long id) {
        Warranty warranty = warrantyRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.WARRANTY_NOT_FOUND));
        warranty.setName(request.getName());
        warranty.setMonths(request.getMonths());
        warranty.setPrice(new BigDecimal(request.getPrice()));
        warranty.setDescription(request.getDescription());
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.WARRANTIES.DELETE')")
    public void deleteWarranty(Long id) {
        warrantyRepository.deleteById(id);
    }


}
