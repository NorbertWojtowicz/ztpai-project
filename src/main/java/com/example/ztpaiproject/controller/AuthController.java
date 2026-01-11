package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.auth.LoginRequest;
import com.example.ztpaiproject.dto.auth.RegisterRequest;
import com.example.ztpaiproject.dto.response.JwtAuthResponse;
import com.example.ztpaiproject.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        authService.registerUser(request);
        return ResponseEntity.ok("Rejestracja pomyślna! Możesz się zalogować.");
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> authenticateUser(@Valid @RequestBody LoginRequest request) {
        JwtAuthResponse response = authService.loginUser(request);
        return ResponseEntity.ok(response);
    }
}