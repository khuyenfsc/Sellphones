package com.sellphones.service.customer;

import com.sellphones.dto.customer.CustomerInfoRequest;
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
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CustomerInfoRepository customerInfoRepository;

    private final UserRepository userRepository;

    private final CustomerInfoMapper customerInfoMapper;

    private final AddressMapper addressMapper;

    @Override
    public void createCustomerInfo(CustomerInfoRequest request) {
        CustomerInfo customerInfo = customerInfoMapper.mapToCustomerInfoEntity(request);
        User user = userRepository.findByEmail(SecurityUtils.extractNameFromAuthentication()).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        customerInfo.setUser(user);

        Address address = addressMapper.mapToAddressEntity(request.getAddress());
        address.setAddressType(AddressType.CUSTOMER);
        customerInfo.setAddress(address);

        customerInfoRepository.save(customerInfo);
    }
}
