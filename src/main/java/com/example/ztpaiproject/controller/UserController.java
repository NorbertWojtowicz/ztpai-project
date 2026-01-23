package com.example.ztpaiproject.controller;

import com.example.ztpaiproject.dto.response.UserProfileResponse;
import com.example.ztpaiproject.dto.response.UserResponse;
import com.example.ztpaiproject.model.Role;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.FishCatchRepository;
import com.example.ztpaiproject.repository.LocationRepository;
import com.example.ztpaiproject.repository.UserRepository;
import com.example.ztpaiproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final FishCatchRepository catchRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
        String currentUsername = authentication.getName();
        return ResponseEntity.ok(userService.getUserProfile(currentUsername));
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String username) {
        UserResponse profile = userService.getUserProfile(username);
        profile.setEmail(null);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));

        String displayRole = "Angler";

        if (user.getRoles() != null) {
            for (Role role : user.getRoles()) {
                if (role.getName() != null && role.getName().toString().toUpperCase().contains("ADMIN")) {
                    displayRole = "Admin";
                    break;
                }
            }
        }

        long totalFish = catchRepository.countByUserUsername(username);
        long totalSpots = locationRepository.countByUserUsername(username);
        Double maxWeight = catchRepository.findMaxWeightByUsername(username);

        String favoriteSpot = "Brak danych";
        List<String> topSpots = catchRepository.findFavoriteSpots(username);

        if (!topSpots.isEmpty()) {
            favoriteSpot = topSpots.get(0);
        }

        return ResponseEntity.ok(UserProfileResponse.builder()
                .username(user.getUsername())
                .role(displayRole)
                .totalFish(totalFish)
                .totalSpots(totalSpots)
                .maxWeight(maxWeight != null ? maxWeight : 0.0)
                .favoriteSpot(favoriteSpot)
                .build());
    }
}