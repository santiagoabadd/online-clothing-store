package com.santidev.products_service.services;

import com.santidev.products_service.model.dtos.ProductRequest;
import com.santidev.products_service.model.dtos.ProductResponse;
import com.santidev.products_service.model.entities.Product;
import com.santidev.products_service.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class ProductService {

    private final ProductRepository productRepository;




    public void addProduct(ProductRequest productRequest) {
        var product = Product.builder()
                .sku(productRequest.getSku())
                .name(productRequest.getName())
                .size(productRequest.getSize())
                .discount(productRequest.getDiscount())
                .description(productRequest.getDescription())
                .category(productRequest.getCategory())
                .price(productRequest.getPrice())
                .status(productRequest.getStatus())
                .build();

        productRepository.save(product);

        log.info("Product added: {}", product);
    }

    public List<ProductResponse> getAllProducts(){
        var products = productRepository.findAll();
        return products.stream().map(this::mapToProductResponse).toList();
    }

    public List<ProductResponse> getProductsByCategory(String category){
        var products = productRepository.findByCategory(category);
        return products.stream().map(this::mapToProductResponse).toList();
    }

    public List<ProductResponse> getProductsBySkuDistinct(){
        var products = productRepository.findDistinctBySku();
        return products.stream().map(this::mapToProductResponse).toList();
    }

    public ProductResponse getProductById(Long id){
        ProductResponse product = this.mapToProductResponse(productRepository.findById(id).get());
        return product;
    }

    public ProductResponse getProductBySkuu(String sku) {
        List<Product> products = productRepository.findBySku(sku);
        if (products.isEmpty()) {
            throw new RuntimeException("Product not found with SKU: " + sku);
        }

        Product product = products.get(0);

        return mapToProductResponse(product);
    }



    private ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .sku(product.getSku())
                .name(product.getName())
                .discount(product.getDiscount())
                .size(product.getSize())
                .category(product.getCategory())
                .description(product.getDescription())
                .price(product.getPrice())
                .status(product.getStatus())
                .build();
    }
}
