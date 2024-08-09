package com.santidev.orders_service.events;

import com.santidev.orders_service.model.enums.OrderStatus;

public record OrderEvent(String orderNumber, int itemCount, OrderStatus orderStatus) {
}
