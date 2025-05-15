package com.example.proyectocloud.categoria.infrastructure;

import com.example.proyectocloud.categoria.domain.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
