package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.FishCatchRequest;
import com.example.ztpaiproject.dto.response.FishCatchResponse;
import com.example.ztpaiproject.model.*;
import com.example.ztpaiproject.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishCatchService {

    private final FishCatchRepository catchRepository;
    private final UserRepository userRepository;
    private final FishSpeciesRepository speciesRepository;
    private final LocationRepository locationRepository;
    private final FishingToolRepository toolRepository;
    private final FishingBaitRepository baitRepository;

    @Transactional
    public FishCatchResponse addCatch(FishCatchRequest request, MultipartFile image, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        FishSpecies species = speciesRepository.findById(request.getFishSpeciesId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono gatunku ryby"));

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono lokalizacji"));

        FishingTool tool = null;
        if (request.getFishingToolId() != null) {
            tool = toolRepository.findById(request.getFishingToolId()).orElse(null);
        }

        FishingBait bait = null;
        if (request.getFishingBaitId() != null) {
            bait = baitRepository.findById(request.getFishingBaitId()).orElse(null);
        }

        FishCatch fishCatch = FishCatch.builder()
                .user(user)
                .fishSpecies(species)
                .location(location)
                .fishingTool(tool)
                .fishingBait(bait)
                .weightKg(request.getWeightKg())
                .lengthCm(request.getLengthCm())
                .catchDate(request.getCatchDate())
                .description(request.getDescription())
                .isPrivate(request.isPrivateRecord())
                .wasReleased(request.getWasReleased())
                .build();

        if (image != null && !image.isEmpty()) {
            try {
                String folderPath = "images/catches/";
                Files.createDirectories(Paths.get(folderPath));

                String originalFilename = image.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }

                String newFilename = UUID.randomUUID().toString() + extension;
                Path path = Paths.get(folderPath + newFilename);
                Files.write(path, image.getBytes());

                fishCatch.setImageUrl("http://localhost:8080/images/catches/" + newFilename);

            } catch (IOException e) {
                throw new RuntimeException("Błąd zapisu zdjęcia", e);
            }
        }

        FishCatch savedCatch = catchRepository.save(fishCatch);
        return mapToResponse(savedCatch);
    }

    public List<FishCatchResponse> getAllPublicCatches() {
        return catchRepository.findByIsPrivateFalseOrderByCatchDateDesc().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<FishCatchResponse> getMyCatches(String username) {
        return catchRepository.findByUser_UsernameOrderByCatchDateDesc(username).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FishCatchResponse mapToResponse(FishCatch entity) {
        return FishCatchResponse.builder()
                .id(entity.getId())
                .description(entity.getDescription())
                .weightKg(entity.getWeightKg())
                .lengthCm(entity.getLengthCm())
                .catchDate(entity.getCatchDate())
                .imageUrl(entity.getImageUrl())
                .username(entity.getUser().getUsername())
                .privateRecord(entity.isPrivate())
                .wasReleased(entity.getWasReleased())
                .fishSpeciesName(entity.getFishSpecies().getName())
                .locationName(entity.getLocation().getName())
                .fishingToolName(entity.getFishingTool() != null ? entity.getFishingTool().getName() : null)
                .fishingBaitName(entity.getFishingBait() != null ? entity.getFishingBait().getName() : null)
                .fishSpeciesId(entity.getFishSpecies().getId())
                .locationId(entity.getLocation().getId())
                .fishingToolId(entity.getFishingTool() != null ? entity.getFishingTool().getId() : null)
                .fishingBaitId(entity.getFishingBait() != null ? entity.getFishingBait().getId() : null)
                .build();
    }

    public FishCatchResponse updateCatch(Long id, FishCatchRequest request, MultipartFile image, String username) {
        FishCatch fishCatch = catchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono połowu o ID: " + id));

        if (!fishCatch.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Brak uprawnień do edycji tego połowu");
        }

        fishCatch.setDescription(request.getDescription());
        fishCatch.setWeightKg(request.getWeightKg());
        fishCatch.setLengthCm(request.getLengthCm());
        fishCatch.setCatchDate(request.getCatchDate());
        fishCatch.setPrivate(request.isPrivateRecord());
        fishCatch.setWasReleased(request.getWasReleased());

        FishSpecies species = speciesRepository.findById(request.getFishSpeciesId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono gatunku ryby"));
        fishCatch.setFishSpecies(species);

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Nie znaleziono lokalizacji"));
        fishCatch.setLocation(location);

        if (request.getFishingToolId() != null) {
            FishingTool tool = toolRepository.findById(request.getFishingToolId())
                    .orElse(null);
            fishCatch.setFishingTool(tool);
        } else {
            fishCatch.setFishingTool(null);
        }

        if (request.getFishingBaitId() != null) {
            FishingBait bait = baitRepository.findById(request.getFishingBaitId())
                    .orElse(null);
            fishCatch.setFishingBait(bait);
        } else {
            fishCatch.setFishingBait(null);
        }

        if (image != null && !image.isEmpty()) {
            try {
                String folderPath = "images/catches/";
                Files.createDirectories(Paths.get(folderPath));

                String originalFilename = image.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }

                String newFilename = UUID.randomUUID().toString() + extension;

                Path path = Paths.get(folderPath + newFilename);
                Files.write(path, image.getBytes());

                fishCatch.setImageUrl("http://localhost:8080/images/catches/" + newFilename);

            } catch (IOException e) {
                throw new RuntimeException("Błąd zapisu zdjęcia", e);
            }
        }

        FishCatch updatedCatch = catchRepository.save(fishCatch);
        return mapToResponse(updatedCatch);
    }

    public FishCatchResponse getCatchById(Long id) {
        FishCatch fishCatch = catchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono połowu o ID: " + id));

        return mapToResponse(fishCatch);
    }
}