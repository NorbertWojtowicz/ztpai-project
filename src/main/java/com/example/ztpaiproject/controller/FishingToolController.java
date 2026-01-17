package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.FishingToolRequest;
import com.example.ztpaiproject.dto.response.FishingToolResponse;
import com.example.ztpaiproject.service.FishingToolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tools")
@RequiredArgsConstructor
public class FishingToolController {

    private final FishingToolService fishingToolService;

    @PostMapping
    public ResponseEntity<FishingToolResponse> addTool(
            @Valid @RequestBody FishingToolRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(fishingToolService.addTool(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<FishingToolResponse>> getMyTools(Authentication authentication) {
        return ResponseEntity.ok(fishingToolService.getMyTools(authentication.getName()));
    }
}
