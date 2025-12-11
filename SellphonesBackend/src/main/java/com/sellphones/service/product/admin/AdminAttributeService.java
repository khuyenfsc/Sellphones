package com.sellphones.service.product.admin;

import com.sellphones.dto.PageResponse;
import com.sellphones.dto.product.admin.*;

public interface AdminAttributeService {
    PageResponse<AdminAttributeResponse> getAttributes(AdminAttribute_FilterRequest request);
    void createAttribute(AdminAttributeRequest request);
    void updateAttribute(AdminAttributeRequest request, Long id);
    void deleteAttribute(Long id);
    AdminAttributeResponse getAttributeById(Long id);
    PageResponse<AdminAttributeValueResponse> getValues(AdminAttributeValue_FilterRequest request, Long attributeValueId);
    void createValue(AdminAttributeValueRequest request, Long attributeId);
    void updateValue(AdminAttributeValueRequest request, Long valueId);
    void deleteAttributeValue(Long valueId);
}
