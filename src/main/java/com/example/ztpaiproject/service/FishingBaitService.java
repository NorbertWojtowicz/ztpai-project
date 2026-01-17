package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.FishingBaitRequest;
import com.example.ztpaiproject.dto.response.FishingBaitResponse;
import com.example.ztpaiproject.model.FishingBait;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.FishingBaitRepository;
import com.example.ztpaiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FishingBaitService {

    private final FishingBaitRepository baitRepository;
    private final UserRepository userRepository;

    @Transactional
    public FishingBaitResponse addBait(FishingBaitRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        FishingBait bait = FishingBait.builder()
                .name(request.getName())
                .type(request.getType())
                .description(request.getDescription())
                .user(user)
                .build();

        FishingBait savedBait = baitRepository.save(bait);

        return mapToResponse(savedBait);
    }

    private FishingBaitResponse mapToResponse(FishingBait bait) {
        return FishingBaitResponse.builder()
                .id(bait.getId())
                .name(bait.getName())
                .type(bait.getType().name())
                .description(bait.getDescription())
                .build();
    }
}