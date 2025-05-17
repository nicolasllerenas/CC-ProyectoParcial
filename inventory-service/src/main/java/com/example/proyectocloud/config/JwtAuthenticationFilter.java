package com.example.proyectocloud.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        
        if (header == null || !header.startsWith("Bearer ")) {
            // Enviar error y detener el filtro
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Falta el token");
            return; 
        }

        String token = header.substring(7);
        try {
            Long userId = jwtUtil.getUserIdFromToken(token);
            UsernamePasswordAuthenticationToken authentication = 
                new UsernamePasswordAuthenticationToken(userId, null, null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            // Registrar el error y enviar respuesta
            logger.error("Error al validar el token: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido");
            return; 
        }
        
        filterChain.doFilter(request, response);
    }
}