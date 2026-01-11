package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.response.UserResponse;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserResponse getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie znaleziony"));

        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .joinedAt(user.getCreatedAt())
                .roles(user.getRoles().stream().map(r -> r.getName().name()).toList())
                .catchesCount(user.getCatches() != null ? user.getCatches().size() : 0)
                .toolsCount(user.getTools() != null ? user.getTools().size() : 0)
                .build();
    }
}