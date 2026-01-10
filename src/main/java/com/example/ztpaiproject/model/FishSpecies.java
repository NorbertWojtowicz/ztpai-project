package com.example.ztpaiproject.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fish_species")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FishSpecies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fish_species_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "latin_name")
    private String latinName;

    @Column(name = "min_size_cm")
    private Integer minSizeCm;
}