package com.example.proyectocloud.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;
    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class); 

    public Long getUserIdFromToken(String token) {
        try {
            // Validar longitud del secret (mínimo 64 bytes para HS512)
            if (secret.getBytes(StandardCharsets.UTF_8).length < 64) {
                throw new IllegalArgumentException("El JWT_SECRET debe tener al menos 64 caracteres.");
            }

            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

            return claims.get("userId", Long.class);
        } catch (Exception e) {
            logger.error("Error al decodificar el token: " + e.getMessage());
            throw e;
        }
    }
}