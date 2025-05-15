package com.example.proyectocloud.producto.application;

import com.example.proyectocloud.producto.domain.Producto;
import com.example.proyectocloud.producto.domain.ProductoService;
import com.example.proyectocloud.producto.dto.CreateProductoDTO;
import com.example.proyectocloud.producto.dto.UpdateProductoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/producto")
public class ProductoController {
    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        List<Producto> productos = productoService.listarProductos();
        return ResponseEntity.ok(productos);
    }

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody CreateProductoDTO producto) {
        Producto nuevoProducto = productoService.crearProducto(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @GetMapping("/{productoId}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long productoId) {
        Producto producto = productoService.getProductoById(productoId);
        return ResponseEntity.ok(producto);
    }

    @PutMapping("/{productoId}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Long productoId, @RequestBody UpdateProductoDTO producto) {
        Optional<Producto> productoActualizado = Optional.ofNullable(productoService.actualizarProducto(productoId, producto));
        return productoActualizado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long productoId) {
        productoService.eliminarProducto(productoId);
        return ResponseEntity.noContent().build();
    }
}
