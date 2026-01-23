package com.example.ztpaiproject.repository;

import com.example.ztpaiproject.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    @Query("SELECT l FROM Location l LEFT JOIN l.user u WHERE l.isPrivate = false OR u.username = :username")
    List<Location> findAllPublicAndUserPrivate(@Param("username") String username);

    long countByUserUsername(String username);
}
