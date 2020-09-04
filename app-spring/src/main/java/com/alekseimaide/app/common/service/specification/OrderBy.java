package com.alekseimaide.app.common.service.specification;

import com.alekseimaide.app.common.exception.MalformedRequestException;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class OrderBy<T> implements Specification<T> {

    private final Map<String, String> fieldToDirectionMap;

    public OrderBy(String orderBy) {
        fieldToDirectionMap = splitOrderByIntoKeyValuePairs(orderBy);
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (fieldToDirectionMap.isEmpty()) {
            return cb.isTrue(cb.literal(true)); // always true = no filtering
        }

        List<Order> orderList = new ArrayList<>();

        fieldToDirectionMap.forEach((fieldName, direction) -> {

            try {
                Expression exp = root.get(fieldName);

                if (direction.equalsIgnoreCase("asc")) {
                    orderList.add(cb.asc(exp));
                } else if (direction.equalsIgnoreCase("desc")) {
                    orderList.add(cb.desc(exp));
                }
            } catch (IllegalArgumentException ex) {
                // Field by given name did not exist. Continue checking next field.
                // log.debug("Sorting using field {}:{} failed. No such field.", fieldName, direction);
            }
        });

        query.orderBy(orderList);

        return null;
    }

    private Map<String, String> splitOrderByIntoKeyValuePairs(String orderBy) {
        Map<String, String> result = new LinkedHashMap<>();

        if (orderBy == null) return result;

        try {
            String[] split = orderBy.split(",");

            Arrays.stream(split).forEach(kv -> {
                String[] keyValue = kv.split(":");

                result.put(keyValue[0].trim(), keyValue[1].trim());
            });
        } catch (Exception ex) {
            throw new MalformedRequestException("Failed reading orderBy clause.");
        }

        return result;
    }
}
