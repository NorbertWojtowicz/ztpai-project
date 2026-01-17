package com.example.ztpaiproject.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "fish_catch")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FishCatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "catch_id")
    private Long id;

    private String description;

    @Column(name = "catch_date", nullable = false)
    private LocalDateTime catchDate;

    @Column(precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "length_cm", precision = 5, scale = 1)
    private BigDecimal lengthCm;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_private")
    @Builder.Default
    private boolean isPrivate = false;

    @Column(name = "was_released")
    @Builder.Default
    private Boolean wasReleased = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fish_species_id", nullable = false)
    private FishSpecies fishSpecies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fishing_tool_id")
    private FishingTool fishingTool;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fishing_bait_id")
    private FishingBait fishingBait;
}