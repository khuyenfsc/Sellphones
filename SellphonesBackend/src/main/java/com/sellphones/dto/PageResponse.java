package com.sellphones.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PageResponse<T> {
    @Builder.Default
    List<T> result = Collections.emptyList();

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Long total;

}
