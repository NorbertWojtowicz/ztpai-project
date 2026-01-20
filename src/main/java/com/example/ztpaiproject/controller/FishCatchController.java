package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.FishCatchRequest;
import com.example.ztpaiproject.dto.response.FishCatchResponse;
import com.example.ztpaiproject.service.FishCatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/catches")
@RequiredArgsConstructor
public class FishCatchController {

    private final FishCatchService fishCatchService;

    @GetMapping("/{id}")
    public ResponseEntity<FishCatchResponse> getCatchById(@PathVariable Long id) {
        return ResponseEntity.ok(fishCatchService.getCatchById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FishCatchResponse> addCatch(
            @ModelAttribute @Valid FishCatchRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication) {
        return ResponseEntity.ok(fishCatchService.addCatch(request, image, authentication.getName()));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FishCatchResponse> updateCatch(
            @PathVariable Long id,
            @ModelAttribute @Valid FishCatchRequest request,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication) {
        return ResponseEntity.ok(fishCatchService.updateCatch(id, request, image, authentication.getName()));
    }

    @GetMapping("/public")
    public ResponseEntity<List<FishCatchResponse>> getPublicCatches() {
        return ResponseEntity.ok(fishCatchService.getAllPublicCatches());
    }

    @GetMapping("/my")
    public ResponseEntity<List<FishCatchResponse>> getMyCatches(Authentication authentication) {
        return ResponseEntity.ok(fishCatchService.getMyCatches(authentication.getName()));
    }
}
