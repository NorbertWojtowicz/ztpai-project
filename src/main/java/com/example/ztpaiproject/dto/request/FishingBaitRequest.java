package com.example.ztpaiproject.dto.request;

import com.example.ztpaiproject.model.enums.FishingBaitType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FishingBaitRequest {
    @NotBlank(message = "Nazwa przynęty jest wymagana")
    private String name;

    @NotNull(message = "Typ przynęty jest wymagany (NATURAL, ARTIFICIAL, MIX)")
    private FishingBaitType type;
    private String description;
}
