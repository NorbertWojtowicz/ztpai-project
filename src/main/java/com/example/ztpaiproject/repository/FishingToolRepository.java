package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishingTool;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FishingToolRepository extends JpaRepository<FishingTool, Long> {
    List<FishingTool> findByUser_Username(String username);
}