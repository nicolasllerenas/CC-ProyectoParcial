package com.example.proyectocloud.producto.domain;

import com.example.proyectocloud.exceptions.ResourceNotFoundException;
import com.example.proyectocloud.producto.dto.CreateProductoDTO;
import com.example.proyectocloud.producto.dto.UpdateProductoDTO;
import com.example.proyectocloud.producto.infrastructure.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {
    private ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }
    public Producto crearProducto(CreateProductoDTO createProductoDTO) {
        Producto producto = new Producto();
        producto.setName(createProductoDTO.getName());
        producto.setDescription(createProductoDTO.getDescription());
        producto.setCurrent_stock(createProductoDTO.getCurrent_stock());
        producto.setCreated_at(createProductoDTO.getCreated_at());
        producto.setUpdated_at(createProductoDTO.getUpdated_at());
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, UpdateProductoDTO updateProductoDTO) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));

        producto.setName(updateProductoDTO.getName());
        producto.setDescription(updateProductoDTO.getDescription());
        producto.setCurrent_stock(updateProductoDTO.getCurrent_stock());
        producto.setCreated_at(updateProductoDTO.getCreated_at());
        producto.setUpdated_at(updateProductoDTO.getUpdated_at());
        return productoRepository.save(producto);
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
    }


    public void eliminarProducto(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
        productoRepository.delete(producto);
    }
}
