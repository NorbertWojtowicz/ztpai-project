package com.example.ztpaiproject.model;

import com.example.ztpaiproject.model.enums.FishingToolType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fishing_tool")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FishingTool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishing_tool_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    private String brand;
    private String model;

    @Enumerated(EnumType.STRING)
    private FishingToolType type;

    // Sprzęt jest przypisany do usera
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}