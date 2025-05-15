package com.example.proyectocloud.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    public Long getUserIdFromToken(String token) {
        // 1. Crear una clave secreta usando el secret
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parserBuilder()
            .setSigningKey(key) // 2. Usar setSigningKey() con la clave secreta
            .build()
            .parseClaimsJws(token)
            .getBody();

        return claims.get("userId", Long.class);
    }
}