package com.santidev.orders_service.model.dtos;

public record OrderItemsResponse(Long id,String sku,Double price,String size ,Long quantity) {
}
