package com.santidev.products_service.controllers;

import com.santidev.products_service.model.dtos.ProductRequest;
import com.santidev.products_service.model.dtos.ProductResponse;
import com.santidev.products_service.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addProduct(@RequestBody ProductRequest productRequest) {
        this.productService.addProduct(productRequest);
    }


    @GetMapping("/{category}")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts(@PathVariable("category") String category){
        return this.productService.getProductsByCategory(category);
    }

    @GetMapping("/sku/{sku}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductBySku(@PathVariable("sku") String sku){
        return this.productService.getProductBySkuu(sku);
    }

    @GetMapping("/product/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponse getProductById(@PathVariable("id") Long id){
        return this.productService.getProductById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts(){
        return this.productService.getAllProducts();
    }
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProductsDistinct(){
        return this.productService.getProductsBySkuDistinct();
    }
}
