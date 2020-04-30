import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  getAllBooks(theCategoryId: number): Observable<Book[]> {

    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseBook>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
}

interface GetResponseBook{
  _embedded: {
    books: Book[];
  }
}