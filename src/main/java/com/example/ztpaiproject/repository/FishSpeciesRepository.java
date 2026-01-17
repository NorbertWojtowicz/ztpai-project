package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishSpecies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishSpeciesRepository extends JpaRepository<FishSpecies, Long> {}