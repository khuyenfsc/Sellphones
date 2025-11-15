package com.sellphones.service.dashboard;

import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.admin.AdminProductVariantResponse;

import java.util.List;
import java.util.Map;

public interface DashboardService{
    Map<String, Object> getOverallDetails(DashboardRequest request);
    Map<String, Object> getTodayDetails();
    AdminProductVariantResponse getMostSellingVariant(DashboardRequest request);
    List<AdminProductVariantResponse> getMostStockedVariants();
    Map<String, Object> getMostSalesCustomer(DashboardRequest request);
    Map<String, Object> getTotalOrdersByDayInMonth(DashboardRequest request);
    Map<String, Object> getTotalOrdersByMonthInYear(Integer year);

}
