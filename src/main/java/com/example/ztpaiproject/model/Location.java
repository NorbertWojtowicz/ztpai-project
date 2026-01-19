package com.example.ztpaiproject.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "location")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}