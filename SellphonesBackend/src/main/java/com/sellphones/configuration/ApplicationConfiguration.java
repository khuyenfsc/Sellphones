package com.sellphones.configuration;

import com.sellphones.mapper.ProductToProductDetailsResponseConverter;
import com.sellphones.mapper.ProductToProductDetailsResponsePropertyMap;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new ProductToProductDetailsResponsePropertyMap());
        return modelMapper;
    }

}
