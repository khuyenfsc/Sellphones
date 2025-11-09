package com.sellphones.service.dashboard;

import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.admin.AdminProductVariantListResponse;

import java.util.List;
import java.util.Map;

public interface DashboardService{
    Map<String, Object> getOverallDetails(DashboardRequest request);
    Map<String, Object> getTodayDetails();
    AdminProductVariantListResponse getMostSellingVariant(DashboardRequest request);
    List<AdminProductVariantListResponse> getMostStockedVariants();
    Map<String, Object> getMostSalesCustomer(DashboardRequest request);
    Map<String, Object> getTotalOrdersByDayInMonth(DashboardRequest request);
    Map<String, Object> getTotalOrdersByMonthInYear(Integer year);

}
