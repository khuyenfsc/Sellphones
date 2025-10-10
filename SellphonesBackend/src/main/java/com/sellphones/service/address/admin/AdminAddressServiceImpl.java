package com.sellphones.service.address.admin;

import com.sellphones.dto.address.AdminAddressFilterRequest;
import com.sellphones.dto.address.AdminAddressRequest;
import com.sellphones.dto.address.AdminAddressResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
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

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAddressServiceImpl implements AdminAddressService{

    private final AddressRepository addressRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.ADDRESSES.VIEW')")
    public List<AdminAddressResponse> getAddresses(AdminAddressFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<Address> spec = AdminAddressSpecificationBuilder.build(request);

        Page<Address> addressPage = addressRepository.findAll(spec, pageable);

        return addressPage.getContent().stream()
                .map(c -> modelMapper.map(c, AdminAddressResponse.class))
                .toList();
    }

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.ADDRESSES.CREATE')")
    public void addAddress(AdminAddressRequest request) {
        Address address = Address.builder()
                .street(request.getStreet())
                .ward(request.getWard())
                .district(request.getDistrict())
                .province(request.getProvince())
                .addressType(AddressType.SUPPLIER)
                .createdAt(LocalDateTime.now())
                .build();

        addressRepository.save(address);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('CLIENTS.ADDRESSES.EDIT')")
    public void editAddress(AdminAddressRequest request, Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        address.setStreet(request.getStreet());
        address.setWard(request.getWard());
        address.setDistrict(request.getDistrict());
        address.setProvince(request.getProvince());
    }

    @Override
    @PreAuthorize("hasAuthority('CLIENTS.ADDRESSES.DELETE')")
    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        if(address.getAddressType() != AddressType.SUPPLIER){
            throw new AppException(ErrorCode.CANNOT_DELETE_CUSTOMER_ADDRESS);
        }

        addressRepository.delete(address);
    }
}
