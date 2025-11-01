package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.model.Product;
import com.example.ztpaiproject.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("{id}")
    public Product getSingleProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
}
