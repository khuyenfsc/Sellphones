package com.sellphones.service.customer;

import com.sellphones.dto.customer.CustomerInfoRequest;
import com.sellphones.dto.customer.CustomerInfoResponse;
import com.sellphones.entity.address.Address;
import com.sellphones.entity.address.AddressType;
import com.sellphones.entity.customer.CustomerInfo;
import com.sellphones.entity.user.User;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.mapper.AddressMapper;
import com.sellphones.mapper.CustomerInfoMapper;
import com.sellphones.repository.customer.CustomerInfoRepository;
import com.sellphones.repository.user.UserRepository;
import com.sellphones.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerInfoRepository customerInfoRepository;

    private final UserRepository userRepository;

    private final CustomerInfoMapper customerInfoMapper;

    private final AddressMapper addressMapper;

    private final ModelMapper modelMapper;

    @Override
    public CustomerInfoResponse createCustomerInfo(CustomerInfoRequest request) {
        CustomerInfo customerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        customerInfo.setUser(user);

        Address address = addressMapper.mapToAddressEntity(request.getAddress());
        address.setAddressType(AddressType.CUSTOMER);
        customerInfo.setAddress(address);

        customerInfo = customerInfoRepository.save(customerInfo);
        return modelMapper.map(customerInfo, CustomerInfoResponse.class);
    }

    @Override
    public List<CustomerInfoResponse> getCustomerInfos() {
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        List<CustomerInfo> customerInfos = customerInfoRepository.findByUser_Email(user.getEmail());

        return customerInfos.stream()
                .map(c -> modelMapper.map(c, CustomerInfoResponse.class))
                .toList();
    }

    @Override
    public CustomerInfoResponse updateCustomerInfo(CustomerInfoRequest request, Long id) {
        CustomerInfo customerInfo = customerInfoRepository.findByUser_EmailAndId(
                SecurityUtils.extractNameFromAuthentication(),
                id
        ).orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        Address address = customerInfo.getAddress();

        CustomerInfo editedCustomerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);
        editedCustomerInfo.setId(id);
        editedCustomerInfo.setCreatedAt(customerInfo.getCreatedAt());

        Address editedAddress = addressMapper.mapToAddressEntity(request.getAddress());
        editedAddress.setAddressType(AddressType.CUSTOMER);
        editedAddress.setId(address.getId());
        editedAddress.setCreatedAt(address.getCreatedAt());

        editedCustomerInfo.setAddress(editedAddress);
        editedCustomerInfo.setUser(customerInfo.getUser());
        customerInfo = customerInfoRepository.save(editedCustomerInfo);

        return modelMapper.map(customerInfo, CustomerInfoResponse.class);
    }

    @Override
    public void deleteCustomerInfo(Long id) {
        customerInfoRepository.deleteById(id);
    }
}
