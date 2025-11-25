package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.inventory.admin.AdminInventoryResponse;
import com.sellphones.dto.product.admin.*;
import com.sellphones.entity.inventory.Inventory;
import com.sellphones.entity.product.Attribute;
import com.sellphones.entity.product.AttributeValue;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.product.AttributeRepository;
import com.sellphones.repository.product.AttributeValueRepository;
import com.sellphones.repository.product.ProductFilterRepository;
import com.sellphones.specification.admin.AdminAttributeSpecificationBuilder;
import com.sellphones.specification.admin.AdminAttributeValueSpecificationBuilder;
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
public class AdminAttributeServiceImpl implements AdminAttributeService{

    private final AttributeRepository attributeRepository;

    private final ProductFilterRepository productFilterRepository;

    private final AttributeValueRepository attributeValueRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("""
    hasAnyAuthority(
        'CATALOG.ATTRIBUTES.VIEW',
        'CATALOG.PRODUCTS.CREATE'
        'CATALOG.PRODUCTS.EDIT'
    )
    """)
    public PageResponse<AdminAttributeResponse> getAttributes(AdminAttributeFilterRequest request){
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "name");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Attribute> spec = AdminAttributeSpecificationBuilder.build(request);

        Page<Attribute> attributePage = attributeRepository.findAll(spec, pageable);
        List<Attribute> attributes = attributePage.getContent();
        List<AdminAttributeResponse> response = attributes.stream()
                .map(i -> modelMapper.map(i, AdminAttributeResponse.class))
                .toList();

        return PageResponse.<AdminAttributeResponse>builder()
                .result(response)
                .total(attributePage.getTotalElements())
                .totalPages(attributePage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.CREATE')")
    public void addAttribute(AdminAttributeRequest request) {
        if (attributeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.ATTRIBUTE_NAME_ALREADY_EXISTS);
        }

        Attribute attribute = Attribute.builder()
                .name(request.getName())
                .createdAt(LocalDateTime.now())
                .build();
        attributeRepository.save(attribute);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.EDIT')")
    public void editAttribute(AdminAttributeRequest request, Long id) {
        Attribute attribute = attributeRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        attribute.setName(request.getName());
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.DELETE')")
    public void deleteAttribute(Long id) {
        attributeRepository.deleteById(id);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.VIEW')")
    public AdminAttributeResponse getAttributeById(Long id) {
        Attribute attribute = attributeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        return modelMapper.map(attribute, AdminAttributeResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.VIEW')")
    public PageResponse<AdminAttributeValueResponse> getAttributeValues(AdminAttributeValueFilterRequest request, Long attributeId) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<AttributeValue> spec = AdminAttributeValueSpecificationBuilder.build(request, attributeId);

        Page<AttributeValue> attributeValuePage = attributeValueRepository.findAll(spec, pageable);
        List<AttributeValue> attributeValues = attributeValuePage.getContent();
        List<AdminAttributeValueResponse> response = attributeValues.stream()
                .map(i -> modelMapper.map(i, AdminAttributeValueResponse.class))
                .toList();

        return PageResponse.<AdminAttributeValueResponse>builder()
                .result(response)
                .total(attributeValuePage.getTotalElements())
                .totalPages(attributeValuePage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.CREATE')")
    public void addAttributeValue(AdminAttributeValueRequest request, Long attributeId) {
        Attribute attribute = attributeRepository.findById(attributeId).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_NOT_FOUND));
        AttributeValue attributeValue = AttributeValue.builder()
                .strVal(request.getStrVal())
                .numericVal((request.getNumericVal()!=null)?BigDecimal.valueOf(request.getNumericVal()):null)
                .attribute(attribute)
                .createdAt(LocalDateTime.now())
                .build();

        attributeValueRepository.save(attributeValue);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.EDIT')")
    public void editAttributeValue(AdminAttributeValueRequest request, Long attributeValueId) {
        AttributeValue attributeValue = attributeValueRepository.findById(attributeValueId).orElseThrow(() -> new AppException(ErrorCode.ATTRIBUTE_VALUE_NOT_FOUND));
        attributeValue.setStrVal(request.getStrVal());
        attributeValue.setNumericVal((request.getNumericVal()!=null)?BigDecimal.valueOf(request.getNumericVal()):null);
    }

    @Override
    @PreAuthorize("hasAuthority('CATALOG.ATTRIBUTES.DELETE')")
    public void deleteAttributeValue(Long attributeValueId) {
        attributeValueRepository.deleteById(attributeValueId);
    }


}
