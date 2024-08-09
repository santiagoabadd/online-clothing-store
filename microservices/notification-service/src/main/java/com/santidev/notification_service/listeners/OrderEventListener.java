package com.santidev.notification_service.listeners;

import com.santidev.notification_service.events.OrderEvent;
import com.santidev.notification_service.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OrderEventListener {

    @KafkaListener(topics = "orders-topic")
    public void handleOrdersNotifications(String message){
        var orderEvent= JsonUtil.fromJson(message, OrderEvent.class);

        //mandar email/sms al cliente
        //notificar otro servicio

        log.info("Order {} event received for order: {} with {} items", orderEvent.orderStatus(),orderEvent.orderNumber(),orderEvent.itemCount());
    }
}
