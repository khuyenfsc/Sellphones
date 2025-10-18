package com.sellphones.service.customer.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.admin.AdminCustomerInfoResponse;
import com.sellphones.dto.order.admin.AdminShipmentListResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.mapper.CustomerInfoMapper;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.specification.admin.AdminCustomerInfoSpecificationBuilder;
import com.sellphones.utils.SecurityUtils;
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
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS.VIEW')")
    public PageResponse<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
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
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS.CREATE')")
    public void createCustomerInfo(CustomerInfoRequest request) {
        CustomerInfo customerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);

        Address address = addressMapper.mapToAddressEntity(request.getAddress());
        address.setAddressType(AddressType.CUSTOMER);
        customerInfo.setAddress(address);

        customerInfoRepository.save(customerInfo);
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.CUSTOMERS.DELETE')")
    public void deleteCustomerInfo(Long id) {
        customerInfoRepository.deleteById(id);
    }


}
