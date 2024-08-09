package com.santidev.orders_service.services;

import com.santidev.orders_service.events.OrderEvent;
import com.santidev.orders_service.model.dtos.*;
import com.santidev.orders_service.model.entities.Order;
import com.santidev.orders_service.model.entities.OrderItems;
import com.santidev.orders_service.model.enums.OrderStatus;
import com.santidev.orders_service.model.feigns.ClientFeignClient;
import com.santidev.orders_service.repositories.OrderRepository;
import com.santidev.orders_service.util.JsonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ClientFeignClient clientFeignClient;
    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    //instancia de kafka
    private final KafkaTemplate<String,String> kafkaTemplate;



    public OrderResponse placeOrder(OrderRequest orderRequest) {


        //Check for inventory
        BaseResponse result = this.webClientBuilder.build()
                .post()
                .uri("lb://inventory-service/api/inventory/in-stock")
                .bodyValue(orderRequest.getOrderItems())
                .retrieve()

                .bodyToMono(BaseResponse.class)
                .block();
        if (result != null && !result.hasErrors()) {
            ClientResponse clientResponse = this.webClientBuilder.build()
                    .get()
                    .uri("lb://clients-service/api/client/user")
                    .retrieve()
                    .bodyToMono(ClientResponse.class)
                    .block();

            Order order = new Order();
            order.setClientId(clientResponse.id().toString());
            order.setOrderNumber(UUID.randomUUID().toString());
            order.setDate(LocalDate.now());
            order.setOrderItems(orderRequest.getOrderItems().stream()
                    .map(orderItemRequest -> mapOrderItemRequestToOrderItem(orderItemRequest, order))
                    .toList());
            var savedOrder =this.orderRepository.save(order);

            // Manda el mensaje a order topic
            this.kafkaTemplate.send("orders-topic", JsonUtil.toJson(
                    new OrderEvent(savedOrder.getOrderNumber(),savedOrder.getOrderItems().size(), OrderStatus.PLACED)
            ));

            return mapToOrderResponse(savedOrder);


        } else {
            throw new IllegalArgumentException("Some of the products are not in stock");
        }
    }

    public List<OrderResponse> getAllOrdersByClient(){

        ClientResponse clientResponse = this.webClientBuilder.build()
                .get()
                .uri("lb://clients-service/api/client/user")
                .retrieve()
                .bodyToMono(ClientResponse.class)
                .block();

        List<Order> orders= this.orderRepository.findByClientId(clientResponse.id().toString());

        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    public List<OrderResponse> getAllOrders(){
        List<Order> orders= this.orderRepository.findAll();

        return orders.stream().map(this::mapToOrderResponse).toList();
    }

    private OrderResponse mapToOrderResponse(Order order) {

        return new OrderResponse(order.getId(),
                order.getOrderNumber(),
                clientFeignClient.getClienteById(Long.parseLong(order.getClientId())),
                order.getDate(),
                order.getOrderItems().stream().map(this::mapToOrderItemRequest).toList());

    }

    private OrderItemsResponse mapToOrderItemRequest(OrderItems orderItems) {
        return new OrderItemsResponse(orderItems.getId(), orderItems.getSku(),orderItems.getPrice(), orderItems.getSize(), orderItems.getQuantity());
    }

    private OrderItems mapOrderItemRequestToOrderItem(OrderItemRequest orderItemRequest, Order order) {
        return OrderItems.builder()
                .id(orderItemRequest.getId())
                .sku(orderItemRequest.getSku())
                .size(orderItemRequest.getSize())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .order(order)
                .build();
    }
}
