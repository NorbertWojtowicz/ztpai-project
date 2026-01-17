package com.example.ztpaiproject.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FishingToolResponse {
    private Long id;
    private String name;
    private String brand;
    private String model;
    private String type;
}