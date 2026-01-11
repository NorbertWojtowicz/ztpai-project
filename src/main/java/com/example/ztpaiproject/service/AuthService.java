package com.example.ztpaiproject.service;

import com.example.ztpaiproject.dto.auth.LoginRequest;
import com.example.ztpaiproject.dto.auth.RegisterRequest;
import com.example.ztpaiproject.dto.response.JwtAuthResponse;
import com.example.ztpaiproject.model.Role;
import com.example.ztpaiproject.model.User;
import com.example.ztpaiproject.model.enums.RoleName;
import com.example.ztpaiproject.repository.RoleRepository;
import com.example.ztpaiproject.repository.UserRepository;
import com.example.ztpaiproject.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public void registerUser(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Błąd: Nazwa użytkownika jest już zajęta!");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Błąd: Email jest już zajęty!");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Błąd: Nie znaleziono roli w bazie."));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(userRole))
                .build();

        userRepository.save(user);
    }

    public JwtAuthResponse loginUser(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .toList();

        return JwtAuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(roles)
                .build();
    }
}
