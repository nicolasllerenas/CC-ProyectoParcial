package com.example.proyectocloud.movimiento_Inventario.domain;

import com.example.proyectocloud.producto.domain.Producto;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class MovimientoInventario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    @Column(name = "user_id") 
    private Long userId; 
    private Producto product_id;
    private Type type;
    private int quantity;
    private Timestamp date;
    private Long user_id;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
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
    public Long getUser_id() {
        return user_id;
    }
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
