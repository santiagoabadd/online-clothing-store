package com.santidev.orders_service.model.dtos;

import java.time.LocalDate;
import java.util.List;

public record OrderResponse (Long id, String orderNumber, ClientResponse client, LocalDate date, List<OrderItemsResponse> orderItems){



}
