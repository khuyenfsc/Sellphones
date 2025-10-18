package com.sellphones.service.address.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.address.admin.AdminAddressFilterRequest;
import com.sellphones.dto.address.AddressRequest;
import com.sellphones.dto.address.AddressResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.repository.address.AddressRepository;
import com.sellphones.specification.admin.AdminAddressSpecificationBuilder;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAddressServiceImpl implements AdminAddressService{

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.ADDRESSES.VIEW')")
    public PageResponse<AddressResponse> getAddresses(AdminAddressFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Address> spec = AdminAddressSpecificationBuilder.build(request);

        Page<Address> addressPage = addressRepository.findAll(spec, pageable);
        List<Address> addresses = addressPage.getContent();
        List<AddressResponse> response = addresses.stream()
                .map(a -> modelMapper.map(a, AddressResponse.class))
                .toList();


        return PageResponse.<AddressResponse>builder()
                .result(response)
                .total(addressPage.getTotalElements())
                .totalPages(addressPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.ADDRESSES.CREATE')")
    public void addAddress(AddressRequest request) {
        Address address = addressMapper.mapToAddressEntity(request);
        addressRepository.save(address);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CUSTOMER.ADDRESSES.EDIT')")
    public void editAddress(AddressRequest request, Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        address.setStreet(request.getStreet());
        address.setWard(request.getWard());
        address.setDistrict(request.getDistrict());
        address.setProvince(request.getProvince());
        address.setAddressType(request.getAddressType());
    }

    @Override
    @PreAuthorize("hasAuthority('CUSTOMER.ADDRESSES.DELETE')")
    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        if(address.getAddressType() != AddressType.SUPPLIER){
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_ADDRESS);
        }

        addressRepository.delete(address);
    }
}
