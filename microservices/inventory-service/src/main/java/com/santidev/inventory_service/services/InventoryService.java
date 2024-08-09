package com.santidev.inventory_service.services;

import com.santidev.inventory_service.model.dtos.BaseResponse;
import com.santidev.inventory_service.model.dtos.OrderItemRequest;
import com.santidev.inventory_service.model.entities.Inventory;
import com.santidev.inventory_service.repositories.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public boolean isInStock(String sku,String size) {
        var inventory = inventoryRepository.findBySkuAndSize(sku,size);

        return inventory.filter(value -> value.getQuantity() > 0).isPresent();
    }

    public BaseResponse areInStock(List<OrderItemRequest> orderItems) {
        var errorList = new ArrayList<String>();

        // Obtener listas de SKU y tamaños
        List<String> skus = orderItems.stream().map(OrderItemRequest::getSku).distinct().toList();
        List<String> sizes = orderItems.stream().map(OrderItemRequest::getSize).distinct().toList();

        // Obtener inventario basado en SKU y tamaño
        List<Inventory> inventoryList = inventoryRepository.findBySkuInAndSizeIn(skus, sizes);

        // Verificar disponibilidad de cada item en el pedido
        orderItems.forEach(orderItem -> {
            var inventory = inventoryList.stream()
                    .filter(inv -> inv.getSku().equals(orderItem.getSku()) && inv.getSize().equals(orderItem.getSize()))
                    .findFirst();
            if (inventory.isEmpty()) {
                errorList.add("Product with SKU " + orderItem.getSku() + " and size " + orderItem.getSize() + " does not exist");
            } else if (inventory.get().getQuantity() < orderItem.getQuantity()) {
                errorList.add("Product with SKU " + orderItem.getSku() + " and size " + orderItem.getSize() + " has insufficient quantity");
            }
        });

        return errorList.size() > 0 ? new BaseResponse(errorList.toArray(new String[0])) : new BaseResponse(null);
    }
}
