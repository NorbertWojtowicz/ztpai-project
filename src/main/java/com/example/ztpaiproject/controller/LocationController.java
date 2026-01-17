package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.LocationRequest;
import com.example.ztpaiproject.dto.response.LocationResponse;
import com.example.ztpaiproject.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @PostMapping
    public ResponseEntity<LocationResponse> addLocation(
            @Valid @RequestBody LocationRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(locationService.addLocation(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<LocationResponse>> getLocations(Authentication authentication) {
        return ResponseEntity.ok(locationService.getAvailableLocations(authentication.getName()));
    }
}