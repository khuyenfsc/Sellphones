package com.sellphones.controller.product.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test/customer")
public class TestCustomerController {

    @GetMapping("/hello")
    public String testHello(){
        return "hello customer";
    }

}
