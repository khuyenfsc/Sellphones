package com.sellphones.service.product;

import com.sellphones.dto.product.BrandResponse;
import com.sellphones.entity.product.Brand;
import com.sellphones.repository.product.BrandRepository;
import com.sellphones.utils.ImageNameToImageUrlConverter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService{

    private final BrandRepository brandRepository;

    private final ModelMapper modelMapper;

    private final String brandIconFolderName = "brand_icons";

    @Override
    public List<BrandResponse> getBrandByCategoryId(Long categoryId) {
        Set<Brand> brands = brandRepository.findByCategories_Id(categoryId);
        return brands.stream()
                .map(b ->{
                        b.setBrandIcon(ImageNameToImageUrlConverter.convert(b.getBrandIcon(), brandIconFolderName));
                        return modelMapper.map(b, BrandResponse.class);
                    }
                )
                .toList();
    }

    @Override
    public List<BrandResponse> getBrandByCategoryName(String categoryName) {
        Set<Brand> brands = brandRepository.findByCategories_Name(categoryName);
        return brands.stream()
                .map(b ->{
                            b.setBrandIcon(ImageNameToImageUrlConverter.convert(b.getBrandIcon(), brandIconFolderName));
                            return modelMapper.map(b, BrandResponse.class);
                        }
                )
                .toList();
    }
}
