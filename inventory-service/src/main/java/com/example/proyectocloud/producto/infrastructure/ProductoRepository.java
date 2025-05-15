package com.example.proyectocloud.producto.infrastructure;

import com.example.proyectocloud.producto.domain.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
