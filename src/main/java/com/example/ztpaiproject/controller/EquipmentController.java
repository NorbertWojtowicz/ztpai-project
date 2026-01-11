package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.request.FishingBaitRequest;
import com.example.ztpaiproject.dto.response.EquipmentResponse;
import com.example.ztpaiproject.service.EquipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    @PostMapping("/baits")
    public ResponseEntity<EquipmentResponse> addBait(
            @Valid @RequestBody FishingBaitRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(equipmentService.addBait(request, authentication.getName()));
    }

    @GetMapping("/baits")
    public ResponseEntity<List<EquipmentResponse>> getMyBaits(Authentication authentication) {
        return ResponseEntity.ok(equipmentService.getMyBaits(authentication.getName()));
    }
}
