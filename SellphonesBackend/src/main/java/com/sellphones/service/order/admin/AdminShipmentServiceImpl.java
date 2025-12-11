package com.sellphones.service.order.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.order.ShipmentResponse;
import com.sellphones.dto.order.admin.AdminShipmentDetailsResponse;
import com.sellphones.dto.order.admin.AdminShipment_FilterRequest;
import com.sellphones.dto.order.admin.AdminUpdateShipmentRequest;
import com.sellphones.entity.order.Shipment;
import com.sellphones.exception.AppException;
import com.sellphones.exception.ErrorCode;
import com.sellphones.repository.order.ShipmentRepository;
import com.sellphones.specification.admin.AdminShipmentSpecificationBuilder;
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
public class AdminShipmentServiceImpl implements AdminShipmentService{

    private final ShipmentRepository shipmentRepository;

    private final ModelMapper modelMapper;

    @Override
    @PreAuthorize("hasAuthority('SALES.SHIPMENTS')")
    public PageResponse<ShipmentResponse> getShipments(AdminShipment_FilterRequest request) {
        Specification<Shipment> spec = AdminShipmentSpecificationBuilder.build(request);
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Page<Shipment> shipmentPage = shipmentRepository.findAll(spec, pageable);
        List<Shipment> shipments = shipmentPage.getContent();
        List<ShipmentResponse> response = shipments.stream()
                .map(o -> modelMapper.map(o, ShipmentResponse.class))
                .toList();

        return PageResponse.<ShipmentResponse>builder()
                .result(response)
                .total(shipmentPage.getTotalElements())
                .totalPages(shipmentPage.getTotalPages())
                .build();
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.SHIPMENTS')")
    public AdminShipmentDetailsResponse getShipmentById(Long id) {
        Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND));
        return modelMapper.map(shipment, AdminShipmentDetailsResponse.class);
    }

    @Override
    @PreAuthorize("hasAuthority('SALES.SHIPMENTS')")
    public void updateShipment(AdminUpdateShipmentRequest request, Long id) {
        Shipment shipment = shipmentRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND));
        shipment.setExpectedDeliveryDate(request.getExpectedDeliveryDate());
        shipmentRepository.save(shipment);
    }


}
