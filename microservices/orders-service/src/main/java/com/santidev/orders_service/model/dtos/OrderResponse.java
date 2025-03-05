package com.santidev.orders_service.model.dtos;

import java.time.LocalDate;
import java.util.List;

public record OrderResponse (Long id, String orderNumber, LocalDate date, List<OrderItemsResponse> orderItems){



}
