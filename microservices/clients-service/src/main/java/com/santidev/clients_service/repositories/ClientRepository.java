package com.santidev.clients_service.repositories;


import com.santidev.clients_service.model.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByUserName(String username);
}
