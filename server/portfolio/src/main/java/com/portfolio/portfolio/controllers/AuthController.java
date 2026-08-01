package com.portfolio.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    @PostMapping("/signup")
    public ResponseEntity handleSignup(Authentication authentication) {
        // Because our filter passed, we know the user is authentic.
        // authentication.getName() contains the Firebase UID.
        String firebaseUid = authentication.getName();

        return ResponseEntity.ok("Successfully verified user with Firebase UID: " + firebaseUid);
    }
}