package com.santidev.orders_service.repositories;


import com.santidev.orders_service.model.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByClientId(String id);
}
