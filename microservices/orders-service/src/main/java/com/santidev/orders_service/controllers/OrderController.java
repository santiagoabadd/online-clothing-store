package com.santidev.orders_service.controllers;


import com.santidev.orders_service.model.dtos.OrderRequest;
import com.santidev.orders_service.model.dtos.OrderResponse;
import com.santidev.orders_service.model.entities.Order;
import com.santidev.orders_service.services.OrderService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CircuitBreaker(name ="orders-service", fallbackMethod = "placerOrderFallBack")
    public ResponseEntity<OrderResponse> placerOrder(@RequestBody OrderRequest orderRequest){
        var orders = this.orderService.placeOrder(orderRequest);
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @GetMapping("/client")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrdersByClient(){
        return this.orderService.getAllOrdersByClient();
    }

    private ResponseEntity<OrderResponse> placerOrderFallBack(OrderRequest orderRequest,Throwable throwable){
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
}
