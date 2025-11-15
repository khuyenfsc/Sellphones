package com.sellphones.controller.dashboard;

import com.sellphones.dto.CommonResponse;
import com.sellphones.dto.dashboard.DashboardRequest;
import com.sellphones.dto.product.admin.AdminProductVariantResponse;
import com.sellphones.service.dashboard.DashboardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/overall-details")
    public ResponseEntity<CommonResponse> getOverallDetails(@Valid DashboardRequest request){
        Map<String, Object> response = dashboardService.getOverallDetails(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/today-details")
    public ResponseEntity<CommonResponse> getTodayDetails(){
        Map<String, Object> response = dashboardService.getTodayDetails();
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/most-selling-variant")
    public ResponseEntity<CommonResponse> getMostSellingVariant(@Valid DashboardRequest request){
        AdminProductVariantResponse response = dashboardService.getMostSellingVariant(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/most-stocked-variants")
    public ResponseEntity<CommonResponse> getMostStockedVariants(){
        List<AdminProductVariantResponse> products = dashboardService.getMostStockedVariants();
        Map<String, Object> map = new HashMap<>();
        map.put("result", products);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/most-sales-user")
    public ResponseEntity<CommonResponse> getMostSalesUser(@Valid DashboardRequest request){
        Map<String, Object> response = dashboardService.getMostSalesCustomer(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));

    }

    @GetMapping("/total-orders-by-day")
    public ResponseEntity<CommonResponse> getTotalOrdersByDayInMonth(@Valid DashboardRequest request){
        Map<String, Object> response = dashboardService.getTotalOrdersByDayInMonth(request);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }

    @GetMapping("/total-orders-by-month/{year}")
    public ResponseEntity<CommonResponse> getTotalOrdersByMonthInYear(@PathVariable Integer year){
        Map<String, Object> response = dashboardService.getTotalOrdersByMonthInYear(year);
        Map<String, Object> map = new HashMap<>();
        map.put("result", response);

        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse(HttpStatus.OK.value(), map));
    }
}
