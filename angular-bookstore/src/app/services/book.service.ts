import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private categoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getAllBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBook> {

    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;

    return this.httpClient.get<GetResponseBook>(searchUrl);
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBook>(searchUrl).pipe(map(response => response._embedded.books));
  }

  getBookCategories(): Observable<BookCategory[]> {
 
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );
  }


  searchBooks(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBook> {

    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;

    return this.httpClient.get<GetResponseBook>(searchUrl);
  }


  getBookDetails(bookId: number): Observable<Book>{

    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    
    return this.httpClient.get<Book>(bookDetailsUrl);
  }


}


interface GetResponseBook{
  _embedded: {
    books: Book[];
  },
  page: {
    // number of records in each page
    size: number,
    // total number of records in database
    totalElements: number,
    // total number of pages starts from 0 index 
    totalPages: number,
    // current page
    number: number
  }
}

interface GetResponseBookCategory{
  _embedded: {
    bookCategory: BookCategory[];
  }
}