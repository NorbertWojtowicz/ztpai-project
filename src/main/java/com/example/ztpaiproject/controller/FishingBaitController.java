package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.FishingBaitRequest;
import com.example.ztpaiproject.dto.response.FishingBaitResponse;
import com.example.ztpaiproject.service.FishingBaitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baits")
@RequiredArgsConstructor
public class FishingBaitController {

    private final FishingBaitService fishingBaitService;

    @PostMapping
    public ResponseEntity<FishingBaitResponse> addBait(
            @Valid @RequestBody FishingBaitRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(fishingBaitService.addBait(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<FishingBaitResponse>> getMyBaits(Authentication authentication) {
        return ResponseEntity.ok(fishingBaitService.getMyBaits(authentication.getName()));
    }
}