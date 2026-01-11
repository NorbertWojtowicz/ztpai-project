package com.example.ztpaiproject.dto.request;

import com.example.ztpaiproject.model.enums.FishingBaitType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FishingBaitRequest {
    @NotBlank(message = "Nazwa przynęty jest wymagana")
    private String name;

    private FishingBaitType type; // NATURAL, ARTIFICIAL, MIX
    private String description;
}
