package com.santidev.products_service.repositories;

import com.santidev.products_service.model.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.id IN (SELECT MIN(p1.id) FROM Product p1 GROUP BY p1.sku)")
    List<Product> findDistinctBySku();

    @Query("SELECT p FROM Product p WHERE p.id IN (SELECT MIN(p1.id) FROM Product p1 WHERE p1.category = ?1 GROUP BY p1.sku)")
    List<Product> findByCategory(String category);

    List<Product> findBySku(String sku);
}
