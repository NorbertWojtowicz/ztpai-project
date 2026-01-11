package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.FishingBaitRequest;
import com.example.ztpaiproject.dto.request.FishingToolRequest;
import com.example.ztpaiproject.dto.response.EquipmentResponse;
import com.example.ztpaiproject.model.FishingBait;
import com.example.ztpaiproject.model.FishingTool;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.FishingBaitRepository;
import com.example.ztpaiproject.repository.FishingToolRepository;
import com.example.ztpaiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final FishingToolRepository toolRepository;
    private final FishingBaitRepository baitRepository;
    private final UserRepository userRepository;

    @Transactional
    public EquipmentResponse addTool(FishingToolRequest request, String username) {
        User user = getUser(username);

        FishingTool tool = FishingTool.builder()
                .name(request.getName())
                .brand(request.getBrand())
                .model(request.getModel())
                .type(request.getType())
                .user(user)
                .build();

        FishingTool saved = toolRepository.save(tool);

        return EquipmentResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .type(saved.getType().name())
                .descriptionOrBrand(saved.getBrand() + " " + saved.getModel())
                .build();
    }

    public List<EquipmentResponse> getMyTools(String username) {
        return toolRepository.findByUser_Username(username).stream()
                .map(tool -> EquipmentResponse.builder()
                        .id(tool.getId())
                        .name(tool.getName())
                        .type(tool.getType().name())
                        .descriptionOrBrand(tool.getBrand() + " " + tool.getModel())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public EquipmentResponse addBait(FishingBaitRequest request, String username) {
        User user = getUser(username);

        FishingBait bait = FishingBait.builder()
                .name(request.getName())
                .type(request.getType())
                .description(request.getDescription())
                .user(user)
                .build();

        FishingBait saved = baitRepository.save(bait);

        return EquipmentResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .type(saved.getType() != null ? saved.getType().name() : "UNKNOWN")
                .descriptionOrBrand(saved.getDescription())
                .build();
    }

    public List<EquipmentResponse> getMyBaits(String username) {
        return baitRepository.findByUser_Username(username).stream()
                .map(bait -> EquipmentResponse.builder()
                        .id(bait.getId())
                        .name(bait.getName())
                        .type(bait.getType() != null ? bait.getType().name() : "UNKNOWN")
                        .descriptionOrBrand(bait.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
