package com.example.proyectocloud.movimiento_Inventario.infrastructure;

import com.example.proyectocloud.movimiento_Inventario.domain.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoInventarioRepository extends JpaRepository<MovimientoInventario, Long> {
}
