package com.example.ztpaiproject.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class FishCatchRequest {

    @NotNull(message = "Musisz wybrać gatunek ryby")
    private Long fishSpeciesId;

    private Long locationId;
    private Long fishingToolId;
    private Long fishingBaitId;

    @NotNull(message = "Data połowu jest wymagana")
    @PastOrPresent(message = "Data połowu nie może być z przyszłości")
    private LocalDateTime catchDate;

    @DecimalMin(value = "0.01", message = "Waga musi być większa od 0")
    private BigDecimal weightKg;

    @DecimalMin(value = "1.0", message = "Długość musi być większa od 1 cm")
    private BigDecimal lengthCm;

    private String description;

    private String imageUrl;

    @JsonProperty("isPrivate")
    private boolean privateRecord;
    private Boolean wasReleased;
}