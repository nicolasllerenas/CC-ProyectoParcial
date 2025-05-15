package com.example.proyectocloud.categoria.domain;

import com.example.proyectocloud.categoria.dto.CategoriaDTO;
import com.example.proyectocloud.categoria.infrastructure.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {this.categoriaRepository = categoriaRepository;}
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }
    public Categoria create(CategoriaDTO categoriaDTO) {
        Categoria categoria = new Categoria();
        categoria.setName(categoriaDTO.getName());
        categoria.setCreated_at(categoriaDTO.getCreated_at());
        categoria.setDescription(categoriaDTO.getDescription());
        return categoriaRepository.save(categoria);
    }
    public void delete(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el categoria con id: " + id));
        categoriaRepository.delete(categoria);
    }
    public Categoria findById(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el categoria con id: " + id));
    }
    public Categoria update(Long id,CategoriaDTO categoriaDTO) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe el categoria con id: " + id));
        categoria.setName(categoriaDTO.getName());
        categoria.setDescription(categoriaDTO.getDescription());
        return categoriaRepository.save(categoria);
    }

}
