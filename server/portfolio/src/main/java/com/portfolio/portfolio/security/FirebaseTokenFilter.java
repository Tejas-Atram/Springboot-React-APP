package com.portfolio.portfolio.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class FirebaseTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // 1. Corrected Logic: If there is NO token, just move on.
        // Spring Security's SecurityConfig will decide if the route is public (like /api/user/1) or protected.
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extract the actual token string by chopping off the first 7 characters ("Bearer ")
        String token = header.substring(7);

        try {
            // Firebase magically verifies the token signature here
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);

            // If valid, tell Spring Security who this user is
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    decodedToken.getUid(), null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (FirebaseAuthException e) {
            // If the token is expired or fake, reject the request
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // Continue the filter chain for authenticated requests
        filterChain.doFilter(request, response);
    }
}