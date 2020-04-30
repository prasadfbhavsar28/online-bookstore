package com.prasad.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prasad.onlinebookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
