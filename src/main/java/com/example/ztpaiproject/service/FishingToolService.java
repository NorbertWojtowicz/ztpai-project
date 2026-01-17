package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.request.FishingToolRequest;
import com.example.ztpaiproject.dto.response.FishingToolResponse;
import com.example.ztpaiproject.model.FishingTool;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.FishingToolRepository;
import com.example.ztpaiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FishingToolService {

    private final FishingToolRepository toolRepository;
    private final UserRepository userRepository;

    @Transactional
    public FishingToolResponse addTool(FishingToolRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika"));

        FishingTool tool = FishingTool.builder()
                .name(request.getName())
                .brand(request.getBrand())
                .model(request.getModel())
                .type(request.getType())
                .user(user)
                .build();

        FishingTool savedTool = toolRepository.save(tool);

        return mapToResponse(savedTool);
    }

    public List<FishingToolResponse> getMyTools(String username) {
        return toolRepository.findByUser_Username(username).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FishingToolResponse mapToResponse(FishingTool tool) {
        return FishingToolResponse.builder()
                .id(tool.getId())
                .name(tool.getName())
                .brand(tool.getBrand())
                .model(tool.getModel())
                .type(tool.getType().name())
                .build();
    }
}