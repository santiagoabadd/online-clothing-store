package com.santidev.orders_service.model.feigns;

import com.santidev.orders_service.model.dtos.ClientResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "clients-service")
public interface ClientFeignClient {
    @GetMapping("/api/client/{id}")
    ClientResponse getClienteById(@PathVariable("id") Long id);
}


