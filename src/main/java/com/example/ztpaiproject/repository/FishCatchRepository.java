package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.FishCatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FishCatchRepository extends JpaRepository<FishCatch, Long> {

    List<FishCatch> findByIsPrivateFalseOrderByCatchDateDesc();

    List<FishCatch> findByUser_UsernameOrderByCatchDateDesc(String username);

    long countByUserUsername(String username);

    @Query("SELECT MAX(c.weightKg) FROM FishCatch c WHERE c.user.username = :username")
    Double findMaxWeightByUsername(@Param("username") String username);

    @Query("SELECT c.location.name FROM FishCatch c WHERE c.user.username = :username GROUP BY c.location.name ORDER BY COUNT(c) DESC")
    List<String> findFavoriteSpots(@Param("username") String username);
}
