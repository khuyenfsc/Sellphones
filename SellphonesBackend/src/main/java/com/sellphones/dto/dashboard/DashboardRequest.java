package com.sellphones.dto.dashboard;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardRequest {

    @Min(1)
    @Max(12)
    @NotNull
    private Integer month;

    @Min(1)
    @NotNull
    private Integer year;

}
