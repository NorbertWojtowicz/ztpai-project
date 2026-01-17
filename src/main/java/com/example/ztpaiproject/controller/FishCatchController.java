package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.FishCatchRequest;
import com.example.ztpaiproject.dto.response.FishCatchResponse;
import com.example.ztpaiproject.service.FishCatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catches")
@RequiredArgsConstructor
public class FishCatchController {

    private final FishCatchService fishCatchService;

    @PostMapping
    public ResponseEntity<FishCatchResponse> addCatch(
            @Valid @RequestBody FishCatchRequest request,
            Authentication authentication
    ) {
        try {
            return ResponseEntity.ok(fishCatchService.addCatch(request, authentication.getName()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/my")
    public ResponseEntity<List<FishCatchResponse>> getMyCatches(Authentication authentication) {
        return ResponseEntity.ok(fishCatchService.getMyCatches(authentication.getName()));
    }
}
