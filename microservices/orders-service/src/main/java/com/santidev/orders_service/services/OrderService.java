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

    private final KafkaTemplate<String,String> kafkaTemplate;

    public OrderResponse placeOrder(OrderRequest orderRequest,String jwtToken) {

        BaseResponse result = this.webClientBuilder.build()
                .post()
                .uri("http://localhost:8080/api/inventory/in-stock")
                .header("Authorization", "Bearer " + jwtToken)
                .bodyValue(orderRequest.getOrderItems())
                .retrieve()
                .bodyToMono(BaseResponse.class)
                .block();

        if (result != null && !result.hasErrors()) {

        ClientResponse clientResponse = this.webClientBuilder.build()
                .get()
                .uri("http://localhost:8080/api/client/user")
                .header("Authorization", "Bearer " + jwtToken)
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

            this.kafkaTemplate.send("orders-topic", JsonUtil.toJson(
                    new OrderEvent(savedOrder.getOrderNumber(),savedOrder.getOrderItems().size(), OrderStatus.PLACED)
            ));

            return mapToOrderResponse(savedOrder);


        } else {
            throw new IllegalArgumentException("Some of the products are not in stock");
        }
    }

    public List<OrderResponse> getAllOrdersByClient(String jwtToken){

        ClientResponse clientResponse = this.webClientBuilder.build()
                .get()
                .uri("http://localhost:8080/api/client/user")
                .header("Authorization", "Bearer " + jwtToken)
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
        long id=1;
        return new OrderResponse(order.getId(),
                order.getOrderNumber(),

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
