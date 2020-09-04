package com.alekseimaide.app.common.response;

import org.springframework.data.domain.Page;

import java.util.Collection;

public class PagedResponse<T> {
    private final Collection<T> collection;
    private final long page;
    private final long pageSize;
    private final long total;

    public PagedResponse(Page<?> page, Collection<T> data) {
        this.collection = data;
        this.page = page.getPageable().getPageNumber();
        this.pageSize = page.getSize();
        this.total = page.getTotalElements();
    }

    public Collection<T> getCollection() {
        return collection;
    }

    public long getPage() {
        return page;
    }

    public long getPageSize() {
        return pageSize;
    }

    public long getTotal() {
        return total;
    }
}
