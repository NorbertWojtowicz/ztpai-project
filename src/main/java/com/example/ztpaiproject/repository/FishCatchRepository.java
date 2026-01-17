package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishCatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishCatchRepository extends JpaRepository<FishCatch, Long> {
    List<FishCatch> findByUser_UsernameOrderByCatchDateDesc(String username);
}
