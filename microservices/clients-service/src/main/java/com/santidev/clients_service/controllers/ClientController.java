package com.santidev.clients_service.controllers;

import com.santidev.clients_service.model.dtos.ClientRequest;
import com.santidev.clients_service.model.dtos.ClientResponse;
import com.santidev.clients_service.model.entities.Client;
import com.santidev.clients_service.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void addClient(@RequestBody ClientRequest clientRequest) {
        this.clientService.addClient(clientRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<ClientResponse> getAllClients(){
        return this.clientService.getAllClients();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClientResponse getClienteById(@PathVariable("id") Long id){
        return this.clientService.getById(id);
    }

    @GetMapping("/user")
    public ClientResponse getUser() {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();


        // Obtener los detalles del usuario desde el token
        String username = authentication.getToken().getClaim("preferred_username");

        System.out.println(username);

        // Buscar el cliente en la base de datos por nombre de usuario
        ClientResponse clientResponse = this.clientService.findByUserName(username);


            return clientResponse;

    }


}
