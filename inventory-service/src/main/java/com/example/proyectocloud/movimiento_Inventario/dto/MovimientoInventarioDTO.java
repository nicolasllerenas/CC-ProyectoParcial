package com.example.proyectocloud.movimiento_Inventario.dto;

import com.example.proyectocloud.movimiento_Inventario.domain.Type;
import com.example.proyectocloud.producto.domain.Producto;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.sql.Timestamp;

public class MovimientoInventarioDTO {
    private Timestamp date;
    private Type type;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto product_id;
    private int quantity;

    public Producto getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Producto product_id) {
        this.product_id = product_id;
    }
    public Type getType() {
        return type;
    }
    public void setType(Type tipe) {
        this.type = tipe;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public Timestamp getDate() {
        return date;
    }
    public void setDate(Timestamp date) {
        this.date = date;
    }
}