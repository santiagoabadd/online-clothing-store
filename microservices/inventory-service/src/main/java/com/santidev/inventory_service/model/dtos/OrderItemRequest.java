package com.santidev.inventory_service.model.dtos;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemRequest {


    private Long id;
    private String sku;
    private String size;
    private Double price;
    private Long quantity;


}
