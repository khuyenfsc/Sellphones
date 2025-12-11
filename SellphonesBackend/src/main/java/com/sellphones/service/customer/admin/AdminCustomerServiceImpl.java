package com.sellphones.service.customer.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfo_FilterRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.mapper.CustomerInfoMapper;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.specification.admin.AdminCustomerInfoSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminCustomerServiceImpl implements AdminCustomerService{

    private final CustomerInfoRepository customerInfoRepository;

    private final CustomerInfoMapper customerInfoMapper;

    private final AddressMapper addressMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("""
        hasAnyAuthority(
            'SALES.ORDERS',
            'CUSTOMER.CUSTOMERS'
        )
    """)
    public PageResponse<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfo_FilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.ASC);
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CustomerInfo> spec = AdminCustomerInfoSpecificationBuilder.build(request);

        Page<CustomerInfo> customerPage = customerInfoRepository.findAll(spec, pageable);
        List<CustomerInfo> customerInfos = customerPage.getContent();
        List<AdminCustomerInfoResponse> response = customerInfos.stream()
                .map(c -> modelMapper.map(c, AdminCustomerInfoResponse.class))
                .toList();

        return PageResponse.<AdminCustomerInfoResponse>builder()
                .result(response)
                .total(customerPage.getTotalElements())
                .totalPages(customerPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS')")
    public AdminCustomerInfoResponse getCustomerInfoById(Long id) {
        CustomerInfo customerInfo = customerInfoRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        return modelMapper.map(customerInfo, AdminCustomerInfoResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS')")
    public void createCustomerInfo(CustomerInfoRequest request) {
        CustomerInfo customerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);

        Address address = addressMapper.mapToAddressEntity(request.getAddress());
        address.setAddressType(AddressType.CUSTOMER);
        customerInfo.setAddress(address);

        customerInfoRepository.save(customerInfo);
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS')")
    public void updateCustomerInfo(CustomerInfoRequest request, Long id) {
        CustomerInfo customerInfo = customerInfoRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        Address address = customerInfo.getAddress();

        CustomerInfo editedCustomerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);
        editedCustomerInfo.setId(id);
        editedCustomerInfo.setCreatedAt(customerInfo.getCreatedAt());

        Address editedAddress = addressMapper.mapToAddressEntity(request.getAddress());
        editedAddress.setAddressType(AddressType.CUSTOMER);
        editedAddress.setId(address.getId());
        editedAddress.setCreatedAt(address.getCreatedAt());

        editedCustomerInfo.setAddress(editedAddress);
        customerInfoRepository.save(editedCustomerInfo);

    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS')")
    public void deleteCustomerInfo(Long id) {
        customerInfoRepository.deleteById(id);
    }


}
