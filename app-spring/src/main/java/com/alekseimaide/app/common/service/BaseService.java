package com.alekseimaide.app.common.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public interface BaseService<T, E> {
    T findById(long id);
    Page<T> findAll(Specification<T> spec, Pageable pageable);
    T create(E form);
    void update(long id, E form);
    void delete(long id);
}
