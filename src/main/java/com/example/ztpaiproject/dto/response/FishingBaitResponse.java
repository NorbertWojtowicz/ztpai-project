package com.example.ztpaiproject.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FishingBaitResponse {
    private Long id;
    private String name;
    private String type;
    private String description;
}