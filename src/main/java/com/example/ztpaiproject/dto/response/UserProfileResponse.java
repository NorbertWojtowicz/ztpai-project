package com.example.ztpaiproject.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {
    private String username;
    private String role;
    private long totalFish;
    private double maxWeight;
    private long totalSpots;
    private String favoriteSpot;
}