package com.alekseimaide.app.user.service.impl;

import com.alekseimaide.app.common.exception.ResourceNotFoundException;
import com.alekseimaide.app.user.entity.User;
import com.alekseimaide.app.user.form.UserForm;
import com.alekseimaide.app.user.repository.UserRepository;
import com.alekseimaide.app.user.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User findById(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found by ID: " + id));
    }

    @Override
    public Page<User> findAll(Specification<User> spec, Pageable pageable) {
        return repository.findAll(spec, pageable);
    }

    @Override
    public User create(UserForm form) {
        User user = new User();
        user.applyForm(form);

        return repository.save(user);
    }

    @Override
    public void update(long id, UserForm form) {
        User user = findById(id);
        user.applyForm(form);

        repository.save(user);
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }
}
