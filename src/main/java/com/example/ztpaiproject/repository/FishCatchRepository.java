package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishCatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FishCatchRepository extends JpaRepository<FishCatch, Long> {

    // 1. Dla tablicy głównej: Pokaż publiczne połowy, posortowane od najnowszych
    List<FishCatch> findByIsPrivateFalseOrderByCatchDateDesc();

    // 2. Dla profilu: Pokaż wszystkie połowy konkretnego użytkownika
    List<FishCatch> findByUser_UsernameOrderByCatchDateDesc(String username);

    // 3. (Opcjonalnie) Dla konkretnej lokalizacji: Pokaż co tu złowiono
    List<FishCatch> findByLocation_IdAndIsPrivateFalse(Long locationId);
}
