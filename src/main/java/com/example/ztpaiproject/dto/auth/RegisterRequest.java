package com.example.ztpaiproject.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Nazwa użytkownika jest wymagana")
    @Size(min = 3, max = 20, message = "Nazwa użytkownika musi mieć od 3 do 20 znaków")
    private String username;

    @NotBlank(message = "Email jest wymagany")
    @Email(message = "Niepoprawny format adresu email")
    private String email;

    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 6, max = 40, message = "Hasło musi mieć od 6 do 40 znaków")
    private String password;
}