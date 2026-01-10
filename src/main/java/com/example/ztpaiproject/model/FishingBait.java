package com.example.ztpaiproject.model;

import com.example.ztpaiproject.model.enums.FishingBaitType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fishing_bait")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FishingBait {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishing_bait_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private FishingBaitType type;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
