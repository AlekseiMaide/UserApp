package com.alekseimaide.app;

import com.alekseimaide.app.common.exception.ResourceNotFoundException;
import com.alekseimaide.app.common.service.specification.LikeOneOfTwoFields;
import com.alekseimaide.app.common.service.specification.OrderBy;
import com.alekseimaide.app.user.entity.User;
import com.alekseimaide.app.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserServiceTests {

    // NB: Uses data.sql for initial data and does not have any specific configuration for testing.

    @Autowired
    UserService userService;

    @Test
    void shouldThrowNotFoundWhenNoUserById() {
        assertThrows(ResourceNotFoundException.class, () -> userService.findById(4));
    }

    @Test
    void shouldFindAll() {
        Page<User> result = userService.findAll(null, Pageable.unpaged());

        assertEquals(3, result.getSize());
    }

    @Test
    void shouldOrderByFirstName() {
        String SEARCH_ORDER = "firstName:desc";

        Specification<User> spec = Specification.where(new OrderBy<>(SEARCH_ORDER));
        Page<User> result = userService.findAll(spec, Pageable.unpaged());

        assertEquals(3, result.getSize());

        List<User> users = result.toList();
        String previousName = "";
        for (User user : users) {
            if (previousName.isBlank()) {
                previousName = user.getFirstName();
            } else {
                assertTrue(previousName.compareTo(user.getFirstName()) >= 0);
                previousName = user.getFirstName();
            }
        }
    }

    @Test
    void shouldFindByFirstName() {
        String SEARCH_TERM = "ain";

        Specification<User> spec = Specification
                .where(new LikeOneOfTwoFields<User>("firstName", "lastName", SEARCH_TERM));

        Page<User> result = userService.findAll(spec, Pageable.unpaged());

        assertEquals(1, result.getSize());
        assertTrue(result.toList().get(0).getFirstName().equalsIgnoreCase(SEARCH_TERM));
    }
}
