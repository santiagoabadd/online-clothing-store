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

    @GetMapping("/filter")
    public List<ProductResponse> getFilteredProducts(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        System.out.println("Received request with params: ");
        System.out.println("Categories: " + categories);
        System.out.println("Sizes: " + sizes);
        System.out.println("Min Price: " + minPrice);
        System.out.println("Max Price: " + maxPrice);
        return productService.getProductsFiltered(categories, sizes, minPrice, maxPrice);
    }


    @GetMapping("/list/sku/{sku}")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProductsBySku(@PathVariable("sku") String sku){
        return this.productService.getProductsBySkuu(sku);
    }

    @GetMapping("/sizes/{sku}")
    @ResponseStatus(HttpStatus.OK)
    public List<String> getAllSizesySku(@PathVariable("sku") String sku){
        return this.productService.getSizesByProduct(sku);
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
