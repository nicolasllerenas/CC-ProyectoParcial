package com.example.proyectocloud.categoria.application;

import com.example.proyectocloud.categoria.domain.Categoria;
import com.example.proyectocloud.categoria.domain.CategoriaService;
import com.example.proyectocloud.categoria.dto.CategoriaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    private CategoriaService categoriaService;

    @Autowired
    public CategoriaController(CategoriaService categoriaService) {this.categoriaService = categoriaService;}

    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaService.findAll();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{categoriaID}")
    public ResponseEntity<Categoria> buscarCategoria(@PathVariable Long categoriaID) {
        Categoria categoria = categoriaService.findById(categoriaID);
        return ResponseEntity.ok(categoria);
    }
    @PostMapping
    public ResponseEntity<Categoria> guardarCategoria(@RequestBody CategoriaDTO categoria) {
        Categoria nuevaCategoria = categoriaService.create(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }

    @DeleteMapping("/{categoriaID}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long categoriaID) {
        categoriaService.delete(categoriaID);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{categoriaID}")
    public ResponseEntity<Categoria> actualizarCategoria(@PathVariable Long categoriaID, @RequestBody CategoriaDTO categoria) {
        Optional<Categoria> categoriaActualizada =Optional.ofNullable(categoriaService.update(categoriaID, categoria));
        return categoriaActualizada.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
