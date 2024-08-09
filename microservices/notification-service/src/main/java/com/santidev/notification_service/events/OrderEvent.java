package com.santidev.notification_service.events;


import com.santidev.notification_service.model.enums.OrderStatus;

public record OrderEvent(String orderNumber, int itemCount, OrderStatus orderStatus) {
}
