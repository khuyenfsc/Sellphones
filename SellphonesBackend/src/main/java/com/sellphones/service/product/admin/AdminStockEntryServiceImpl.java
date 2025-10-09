package com.sellphones.service.product.admin;

import com.sellphones.dto.product.admin.AdminStockEntryFilterRequest;
import com.sellphones.dto.product.admin.AdminStockEntryResponse;
import com.sellphones.dto.product.admin.AdminSupplierResponse;
import com.sellphones.entity.product.StockEntry;
import com.sellphones.entity.product.Supplier;
import com.sellphones.repository.product.StockEntryRepository;
import com.sellphones.specification.admin.AdminStockEntrySpecificationBuilder;
import com.sellphones.specification.admin.AdminSupplierSpecificationBuilder;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStockEntryServiceImpl implements AdminStockEntryService{

    private final StockEntryRepository stockEntryRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<AdminStockEntryResponse> getStockEntries(AdminStockEntryFilterRequest request) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(request.getSortType())
                .orElse(Sort.Direction.DESC);
        Sort sort = Sort.by(direction, "createdAt");
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), sort);

        Specification<StockEntry> spec = AdminStockEntrySpecificationBuilder.build(request);

        Page<StockEntry> stockEntryPage = stockEntryRepository.findAll(spec, pageable);

        return stockEntryPage.getContent().stream()
                .map(c -> modelMapper.map(c, AdminStockEntryResponse.class))
                .toList();
    }
}
