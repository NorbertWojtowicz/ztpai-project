package com.example.ztpaiproject.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class FishCatchResponse {

    private Long id;
    private String description;
    private LocalDateTime catchDate;
    private BigDecimal weightKg;
    private BigDecimal lengthCm;
    private String imageUrl;

    @JsonProperty("isPrivate")
    private boolean privateRecord;
    private Boolean wasReleased;

    private String fishSpeciesName;
    private String locationName;
    private String fishingToolName;
    private String fishingBaitName;

    private String username;
    private Long userId;
}
