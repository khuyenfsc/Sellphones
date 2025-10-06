package com.sellphones.mapper;

import com.sellphones.constant.AppConstants;
import com.sellphones.dto.product.admin.AdminFilterOptionResponse;
import com.sellphones.dto.product.response.FilterOptionResponse;
import com.sellphones.entity.product.FilterOption;
import org.modelmapper.Converter;
import org.modelmapper.PropertyMap;
import org.modelmapper.spi.MappingContext;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Filter;

public class FilterOptionToAdminFilterOptionResponsePropertyMap extends PropertyMap<FilterOption, FilterOptionResponse> {

    private final Converter<FilterOption, AdminFilterOptionResponse> filterOptionToAdminFilterOptionResponseConverter = new Converter<FilterOption, AdminFilterOptionResponse>() {

        @Override
        public AdminFilterOptionResponse convert(MappingContext<FilterOption, AdminFilterOptionResponse> mappingContext) {
            FilterOption source = mappingContext.getSource();
            AdminFilterOptionResponse dest = new AdminFilterOptionResponse();
            dest.setId(source.getId());
            dest.setCreatedAt(source.getCreatedAt());
            dest.setName(source.getName());
            dest.setAttributeName(source.getAttribute().getName());
            setCondition(dest, source.getCondition());

            return dest;
        }

        private void setCondition(AdminFilterOptionResponse dest, String condition){
            String[] numbers = condition.split("\\D+");

            List<String> validNumbers = Arrays.stream(numbers)
                    .filter(s -> !s.isBlank())
                    .toList();

            try {
                if (condition.contains("bang") && !validNumbers.isEmpty()) {
                    BigDecimal value = new BigDecimal(validNumbers.get(0));
                    dest.setKey("Bằng");
                    dest.setVal(value.toString());
                } else if (condition.contains("tren") && !validNumbers.isEmpty()) {
                    BigDecimal value = new BigDecimal(validNumbers.get(0));
                    dest.setKey("Lớn hơn");
                    dest.setVal(value.toString());
                } else if (condition.contains("duoi") && !validNumbers.isEmpty()) {
                    BigDecimal value = new BigDecimal(validNumbers.get(0));
                    dest.setKey("Bé hơn");
                    dest.setVal(value.toString());
                } else if (condition.contains("chua")) {
                    if (condition.contains("-")) {
                        condition = condition.substring(condition.indexOf("-") + 1).trim();
                    }
                    dest.setKey("Chứa");
                    dest.setVal(condition);

                } else if (validNumbers.size() >= 2) { // khoảng
                    BigDecimal minValue = new BigDecimal(validNumbers.get(0));
                    BigDecimal maxValue = new BigDecimal(validNumbers.get(1));
                    dest.setKey("Trong khoảng");
                    dest.setVal(minValue.toString());
                    dest.setVal2(maxValue.toString());
                }
            } catch (NumberFormatException e) {
                System.err.println("Invalid number in condition: " + condition);
            }
        }
    };



    @Override
    protected void configure() {
        using(filterOptionToAdminFilterOptionResponseConverter).map(source, destination);
    }
}
