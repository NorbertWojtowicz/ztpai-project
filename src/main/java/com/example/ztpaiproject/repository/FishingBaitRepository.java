package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishingBait;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FishingBaitRepository extends JpaRepository<FishingBait, Long> {
    List<FishingBait> findByUser_Username(String username);
}
