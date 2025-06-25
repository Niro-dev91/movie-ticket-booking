package com.example.upcomingmoviesservice.DTO;

import java.util.List;
import com.example.upcomingmoviesservice.Entity.Movie;
import org.springframework.data.domain.Page;

public class MoviePageResponse {
    private List<Movie> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;

    public MoviePageResponse(Page<Movie> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber();
        this.pageSize = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
    }

    public List<Movie> getContent() {
        return content;
    }

    public void setContent(List<Movie> content) {
        this.content = content;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }
}
