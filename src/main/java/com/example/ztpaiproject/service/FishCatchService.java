package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.FishCatchRequest;
import com.example.ztpaiproject.dto.response.FishCatchResponse;
import com.example.ztpaiproject.model.*;
import com.example.ztpaiproject.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    public FishCatchResponse addCatch(FishCatchRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FishSpecies species = speciesRepository.findById(request.getFishSpeciesId())
                .orElseThrow(() -> new RuntimeException("Gatunek ryby nie istnieje"));

        Location location = null;
        if (request.getLocationId() != null) {
            location = locationRepository.findById(request.getLocationId())
                    .orElseThrow(() -> new RuntimeException("Lokalizacja nie istnieje"));
        }

        FishingTool tool = null;
        if (request.getFishingToolId() != null) {
            tool = toolRepository.findById(request.getFishingToolId())
                    .orElseThrow(() -> new RuntimeException("Sprzęt nie istnieje"));
            if (!tool.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Nie możesz użyć cudzego sprzętu!");
            }
        }

        FishingBait bait = null;
        if (request.getFishingBaitId() != null) {
            bait = baitRepository.findById(request.getFishingBaitId())
                    .orElseThrow(() -> new RuntimeException("Przynęta nie istnieje"));
            if (!bait.getUser().getId().equals(user.getId())) {
                throw new RuntimeException("Nie możesz użyć cudzej przynęty!");
            }
        }

        FishCatch fishCatch = FishCatch.builder()
                .user(user)
                .fishSpecies(species)
                .location(location)
                .fishingTool(tool)
                .fishingBait(bait)
                .description(request.getDescription())
                .catchDate(request.getCatchDate())
                .weightKg(request.getWeightKg())
                .lengthCm(request.getLengthCm())
                .imageUrl(request.getImageUrl())
                .isPrivate(request.getIsPrivate() != null ? request.getIsPrivate() : false)
                .wasReleased(request.getWasReleased() != null ? request.getWasReleased() : false)
                .build();

        FishCatch saved = catchRepository.save(fishCatch);

        return mapToResponse(saved);
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
                .catchDate(entity.getCatchDate())
                .weightKg(entity.getWeightKg())
                .lengthCm(entity.getLengthCm())
                .imageUrl(entity.getImageUrl())
                .wasReleased(entity.getWasReleased())
                .fishSpeciesName(entity.getFishSpecies().getName())
                .locationName(entity.getLocation() != null ? entity.getLocation().getName() : "Nieznana")
                .fishingToolName(entity.getFishingTool() != null ? entity.getFishingTool().getName() : "Brak danych")
                .fishingBaitName(entity.getFishingBait() != null ? entity.getFishingBait().getName() : "Brak danych")
                .username(entity.getUser().getUsername())
                .userId(entity.getUser().getId())
                .build();
    }
}