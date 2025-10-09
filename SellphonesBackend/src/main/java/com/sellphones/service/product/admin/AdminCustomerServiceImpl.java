package com.sellphones.service.product.admin;

import com.sellphones.dto.customer.AdminCustomerInfoFilterRequest;
import com.sellphones.dto.customer.AdminCustomerInfoResponse;
import com.sellphones.entity.customer.CustomerInfo;
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

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.CUSTOMERS.VIEW')")
    public List<AdminCustomerInfoResponse> getCustomerInfos(AdminCustomerInfoFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<CustomerInfo> spec = AdminCustomerInfoSpecificationBuilder.build(request);

        Page<CustomerInfo> commentPage = customerInfoRepository.findAll(spec, pageable);

        return commentPage.getContent().stream()
                .map(c -> modelMapper.map(c, AdminCustomerInfoResponse.class)).toList();
    }

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.CUSTOMERS.DELETE')")
    public void deleteCustomerInfo(Long id) {
        customerInfoRepository.deleteById(id);
    }


}
