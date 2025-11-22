package com.sellphones.mapper;

import com.sellphones.dto.product.admin.AdminFilterOptionResponse;
import com.sellphones.entity.product.FilterOption;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;


public class FilterOptionToAdminFilterOptionResponseConverter
        implements Converter<FilterOption, AdminFilterOptionResponse> {


    @Override
    public AdminFilterOptionResponse convert(MappingContext<FilterOption, AdminFilterOptionResponse> mappingContext) {
        FilterOption source = mappingContext.getSource();
        if (source == null) return null;

        AdminFilterOptionResponse dest = new AdminFilterOptionResponse();
        dest.setId(source.getId());
        dest.setCreatedAt(source.getCreatedAt());
        dest.setName(source.getName());
        setCondition(dest, source.getCondition());
        return dest;
    }

    private void setCondition(AdminFilterOptionResponse dest, String condition) {
        if (condition == null || condition.isBlank()) {
            return;
        }

        String lower = condition.toLowerCase();
        String[] parts = lower.split("-");
        if (parts.length < 2) return;

        try {
            if (lower.contains("bang")) {
                dest.setKey("Bằng");
                dest.setVal1(parts[1]);

            } else if (lower.contains("lon")) {
                dest.setKey("Lớn hơn hoặc bằng");
                dest.setVal1(parts[1]);

            } else if (lower.contains("be")) {
                dest.setKey("Bé hơn hoặc bàng");
                dest.setVal1(parts[1]);

            } else if (lower.contains("chua")) {
                dest.setKey("Chứa");
                dest.setVal1(parts[1]);

            } else {
                dest.setKey("Trong khoảng");
                dest.setVal1(parts[0]);
                dest.setVal2(parts[1]);
            }

        } catch (NumberFormatException e) {
            System.err.println("Lỗi parse số trong điều kiện: " + condition);
        }
    }
}

