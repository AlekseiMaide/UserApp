package com.alekseimaide.app.common.service.specification;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class LikeOneOfTwoFields<T> implements Specification<T> {

    private final String fieldOne;
    private final String fieldTwo;
    private final String matchWith;

    public LikeOneOfTwoFields(String fieldOne, String fieldTwo, String matchWith) {
        this.matchWith = matchWith;
        this.fieldOne = fieldOne;
        this.fieldTwo = fieldTwo;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (matchWith == null) {
            return cb.isTrue(cb.literal(true)); // always true = no filtering
        }

        Predicate fieldOnePredicate = cb.like(cb.lower(root.get(fieldOne)), "%" + matchWith.toLowerCase() + "%");
        Predicate fieldTwoPredicate = cb.like(cb.lower(root.get(fieldTwo)), "%" + matchWith.toLowerCase() + "%");

        return cb.or(fieldOnePredicate, fieldTwoPredicate);
    }
}