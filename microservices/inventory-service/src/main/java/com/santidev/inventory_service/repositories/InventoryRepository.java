package com.santidev.inventory_service.repositories;

import com.santidev.inventory_service.model.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findBySku(String sku);

    List<Inventory> findBySkuIn(List<String> skus);

    @Query("SELECT i FROM Inventory i WHERE i.sku = :sku AND i.size = :size")
    Optional<Inventory> findBySkuAndSize(@Param("sku") String sku, @Param("size") String size);

    List<Inventory> findBySkuInAndSizeIn(List<String> skus, List<String> sizes);
}