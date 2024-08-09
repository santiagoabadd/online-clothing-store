package com.santidev.clients_service.services;



import com.santidev.clients_service.model.dtos.ClientRequest;
import com.santidev.clients_service.model.dtos.ClientResponse;
import com.santidev.clients_service.model.entities.Client;
import com.santidev.clients_service.repositories.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j

public class ClientService {

    private final ClientRepository clientRepository;


    public void addClient(ClientRequest clientRequest) {
        var client = Client.builder()
                .userName((clientRequest.getUserName()))
                .firstName(clientRequest.getFirstName())
                .lastName(clientRequest.getLastName())
                .email(clientRequest.getEmail())
                .address(clientRequest.getAddress())
                .build();

        clientRepository.save(client);

        log.info("Client added: {}", client);
    }

    public List<ClientResponse> getAllClients() {
        var clients = clientRepository.findAll();
        return clients.stream().map(this::mapToClientResponse).toList();
    }

    public ClientResponse getById(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        return mapToClientResponse(client.get());
    }


    public ClientResponse findByUserName(String userName) {
        return mapToClientResponse(clientRepository.findByUserName(userName).get());
    }



    private ClientResponse mapToClientResponse(Client client) {
        return ClientResponse.builder()
                .id(client.getId())
                .userName((client.getUserName()))
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .email(client.getEmail())
                .address(client.getAddress())
                .build();
    }
}