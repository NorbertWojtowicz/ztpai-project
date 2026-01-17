package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.model.FishSpecies;
import com.example.ztpaiproject.repository.FishSpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/species")
@RequiredArgsConstructor
public class FishSpeciesController {

    private final FishSpeciesRepository speciesRepository;

    @GetMapping
    public ResponseEntity<List<FishSpecies>> getAllSpecies() {
        return ResponseEntity.ok(speciesRepository.findAll());
    }
}