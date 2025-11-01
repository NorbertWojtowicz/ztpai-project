package com.example.ztpaiproject.services;

import com.example.ztpaiproject.exception.NoSuchProductException;
import com.example.ztpaiproject.model.Product;
import com.example.ztpaiproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product getProductById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            throw new NoSuchProductException(id);
        }
        return product;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
