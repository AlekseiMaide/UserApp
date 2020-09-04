package com.alekseimaide.app.user.controller;

import com.alekseimaide.app.common.response.PagedResponse;
import com.alekseimaide.app.common.service.specification.LikeOneOfTwoFields;
import com.alekseimaide.app.common.service.specification.OrderBy;
import com.alekseimaide.app.user.entity.User;
import com.alekseimaide.app.user.dto.UserDto;
import com.alekseimaide.app.user.form.UserForm;
import com.alekseimaide.app.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin // Here for demo purpose.
@RestController
@RequestMapping(path = "/user", produces = "application/json")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping(value = "/{id}")
    public UserDto findById(@PathVariable final long id) {

        User user = service.findById(id);

        return new UserDto(user);
    }

    @GetMapping
    public PagedResponse<UserDto> search(
            final String searchName,
            final String orderBy,
            final Pageable pageable) {

        Specification<User> spec = Specification
                .where(new OrderBy<User>(orderBy))
                .and(new LikeOneOfTwoFields<User>("firstName", "lastName", searchName));

        Page<User> result = service.findAll(spec, pageable);

        return new PagedResponse<>(result, getUserDtoList(result));
    }

    @PostMapping
    public UserDto create(@Valid @RequestBody final UserForm form) {
        return new UserDto(service.create(form));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> update(
            @PathVariable final long id,
            @Valid @RequestBody final UserForm form) {

        service.update(id, form);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable final long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }

    private List<UserDto> getUserDtoList(Page<User> page) {
        return page.stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }
}
