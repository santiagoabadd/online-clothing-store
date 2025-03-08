package com.santidev.clients_service.controllers;

import com.santidev.clients_service.model.dtos.AuthRequest;
import com.santidev.clients_service.model.dtos.ClientRequest;
import com.santidev.clients_service.model.dtos.ClientResponse;
import com.santidev.clients_service.model.entities.Client;
import com.santidev.clients_service.services.ClientService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

    private final AuthenticationManager authenticationManager;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addClient(@RequestBody ClientRequest clientRequest) {
        this.clientService.addClient(clientRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
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



        String username = authentication.getToken().getClaim("preferred_username");

        System.out.println(username);

        ClientResponse clientResponse = this.clientService.findByUserName(username);


            return clientResponse;

    }

    @PostMapping("/register")
    public void addNewUser(@RequestBody ClientRequest user) {
        this.clientService.addClient(user);
    }

    @PostMapping("/token")
    public String getToken(@RequestBody AuthRequest authRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(),authRequest.getPassword()));

        if(authentication.isAuthenticated()){
            return this.clientService.generateToken(authRequest.getUserName());
        }else{
            throw new RuntimeException("invalid access");
        }


    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        this.clientService.validateToken(token);
        return "Token is valid";
    }


}
