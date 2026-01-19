package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.LocationRequest;
import com.example.ztpaiproject.dto.response.LocationResponse;
import com.example.ztpaiproject.model.Location;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.LocationRepository;
import com.example.ztpaiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.util.UUID;
import java.io.IOException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    @Transactional
    public LocationResponse addLocation(LocationRequest request, MultipartFile image, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Location location = Location.builder()
                .name(request.getName())
                .description(request.getDescription())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .isPrivate(request.getIsPrivate())
                .user(user)
                .build();

        // 2. Obsługa zapisu pliku
        if (image != null && !image.isEmpty()) {
            try {
                String folderPath = "images/spots/";
                Files.createDirectories(Paths.get(folderPath));

                String originalFilename = image.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                String newFilename = UUID.randomUUID().toString() + extension;

                Path path = Paths.get(folderPath + newFilename);
                Files.write(path, image.getBytes());

                String fileUrl = "http://localhost:8080/images/spots/" + newFilename;
                location.setImageUrl(fileUrl);

            } catch (IOException e) {
                throw new RuntimeException("Nie udało się zapisać zdjęcia", e);
            }
        }

        Location saved = locationRepository.save(location);
        return mapToResponse(saved);
    }

    public List<LocationResponse> getAvailableLocations(String username) {
        return locationRepository.findAllPublicAndUserPrivate(username).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private LocationResponse mapToResponse(Location location) {
        return LocationResponse.builder()
                .id(location.getId())
                .name(location.getName())
                .description(location.getDescription())
                .latitude(location.getLatitude())
                .longitude(location.getLongitude())
                .isPrivate(location.getIsPrivate() != null && location.getIsPrivate())
                .ownerUsername(location.getUser() != null ? location.getUser().getUsername() : "System")
                .imageUrl(location.getImageUrl())
                .build();
    }
}