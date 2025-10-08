package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.*;

import java.util.List;

public interface AdminAttributeService {
    List<AdminAttributeResponse> getAttributes(AdminAttributeFilterRequest request);
    void addAttribute(AdminAttributeRequest request);
    void editAttribute(AdminAttributeRequest request, Long id);
    void deleteAttribute(Long id);
    List<AdminAttributeValueResponse> getAttributeValues(AdminAttributeValueFilterRequest request, Long attributeValueId);
    void addAttributeValue(AdminAttributeValueRequest request, Long attributeId);
    void editAttributeValue(AdminAttributeValueRequest request, Long attributeId);
    void deleteAttributeValue(Long attributeValueId);
}
