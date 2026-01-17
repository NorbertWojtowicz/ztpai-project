package com.example.ztpaiproject.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationResponse {
    private Long id;
    private String name;
    private String description;
    private Double latitude;
    private Double longitude;
    private boolean isPrivate;
    private String ownerUsername;
}
