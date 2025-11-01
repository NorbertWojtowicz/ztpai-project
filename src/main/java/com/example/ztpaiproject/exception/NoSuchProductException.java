package com.example.ztpaiproject.exception;

public class NoSuchProductException extends RuntimeException {
    public NoSuchProductException(long productId) {
        super("No such product: " + productId);
    }
}
