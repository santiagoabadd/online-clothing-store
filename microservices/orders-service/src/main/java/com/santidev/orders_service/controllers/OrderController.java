package com.santidev.orders_service.controllers;


import com.santidev.orders_service.model.dtos.OrderRequest;
import com.santidev.orders_service.model.dtos.OrderResponse;
import com.santidev.orders_service.model.entities.Order;
import com.santidev.orders_service.services.OrderService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import jakarta.servlet.http.HttpServletRequest;
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
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest, HttpServletRequest request) {

        String jwtToken = extractJwtToken(request);

        OrderResponse orderResponse = this.orderService.placeOrder(orderRequest, jwtToken);

        return ResponseEntity.ok(orderResponse);
    }

    private String extractJwtToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }



    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrders(){
        return this.orderService.getAllOrders();
    }

    @GetMapping("/client")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrdersByClient(HttpServletRequest request){
        String jwtToken = extractJwtToken(request);
        return this.orderService.getAllOrdersByClient(jwtToken);
    }

    private ResponseEntity<OrderResponse> placerOrderFallBack(OrderRequest orderRequest,Throwable throwable){
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
}
