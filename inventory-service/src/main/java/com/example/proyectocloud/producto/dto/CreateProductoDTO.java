package com.example.proyectocloud.producto.dto;

import com.example.proyectocloud.categoria.domain.Categoria;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.sql.Timestamp;

public class CreateProductoDTO {
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria category_id;
    private int current_stock;
    private Timestamp created_at;
    private Timestamp updated_at;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public int getCurrent_stock() {
        return current_stock;
    }
    public void setCurrent_stock(int current_stock) {
        this.current_stock = current_stock;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public Timestamp getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
}
