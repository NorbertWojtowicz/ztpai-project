package com.example.ztpaiproject.dto.request;

import com.example.ztpaiproject.model.enums.FishingToolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FishingToolRequest {
    @NotBlank(message = "Nazwa jest wymagana")
    private String name;

    private String brand;
    private String model;

    @NotNull(message = "Typ sprzętu jest wymagany (ROD, REEL, LINE, ACCESSORY)")
    private FishingToolType type;
}