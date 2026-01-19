package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.LocationRequest;
import com.example.ztpaiproject.dto.response.LocationResponse;
import com.example.ztpaiproject.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // Ważne!
    public ResponseEntity<LocationResponse> addLocation(
            @ModelAttribute @Valid LocationRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication) {

        LocationResponse response = locationService.addLocation(request, image, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<LocationResponse>> getLocations(Authentication authentication) {
        return ResponseEntity.ok(locationService.getAvailableLocations(authentication.getName()));
    }
}