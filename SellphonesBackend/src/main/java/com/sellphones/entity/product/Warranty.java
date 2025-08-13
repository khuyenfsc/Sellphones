package com.sellphones.entity.product;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;

public class Warranty {
    @Min(6)
    private int numberOfMonths;

    @Column(columnDefinition = "TEXT")
    private String description;
}
