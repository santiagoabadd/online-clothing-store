package com.santidev.orders_service.model.dtos;

public record ClientResponse (
        Long id,
        String userName,
        String firstName,
        String lastName,
        String email ){

}