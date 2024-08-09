package com.santidev.products_service.model.dtos;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class ProductResponse {
    private Long id;
    private String sku;
    private String name;
    private String category;
    private String size;
    private Double discount;
    private String description;
    private Double price;
    private Boolean status;
}
