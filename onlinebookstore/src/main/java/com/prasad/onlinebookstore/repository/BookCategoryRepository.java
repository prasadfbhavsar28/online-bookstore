package com.prasad.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.prasad.onlinebookstore.entity.BookCategory;

@RepositoryRestResource(collectionResourceRel = "bookCategory", path = "book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long>{

}
 