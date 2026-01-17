package com.example.ztpaiproject.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LocationRequest {

    @NotBlank(message = "Nazwa lokalizacji jest wymagana")
    @Size(min = 3, max = 100, message = "Nazwa musi mieć od 3 do 100 znaków")
    private String name;

    private String description;

    @NotNull(message = "Szerokość geograficzna jest wymagana")
    @Min(value = -90, message = "Szerokość musi być >= -90")
    @Max(value = 90, message = "Szerokość musi być <= 90")
    private Double latitude;

    @NotNull(message = "Długość geograficzna jest wymagana")
    @Min(value = -180, message = "Długość musi być >= -180")
    @Max(value = 180, message = "Długość musi być <= 180")
    private Double longitude;

    private Boolean isPrivate;
}
