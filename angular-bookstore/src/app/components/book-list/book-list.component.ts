import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number  = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  // new properties for server side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _bookService: BookService,
              private _activatedRoute: ActivatedRoute,
              private _config: NgbPaginationConfig) { 
                _config.maxSize = 3;
                _config.boundaryLinks = true;
              }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }


  listBooks() {

     this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    
    if ( this.searchMode ) {
      // do search work
      this.handleSearchBooks();
    } else {
      // display books based on category
      this.handleListBooks();
    }
  }

  handleListBooks() {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if( hasCategoryId ){
        this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    // setting up the current page to 1
    // if user navigate to other category
    if ( this.previousCategory != this.currentCategoryId ) {
      this.currentPage = 1;
    }

    this._bookService.getAllBooks(this.currentCategoryId,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processPaginate());

  }

  handleSearchBooks() {

    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.searchBooks(keyword,
                                  this.currentPage - 1,
                                  this.pageSize).subscribe(this.processPaginate());
  }


  updatePageSize(thePageSize: number){
    this.pageSize = thePageSize;
    this.currentPage = 1;
    this.listBooks();
  }


  processPaginate(){
    return data => {
      this.books = data._embedded.books;
      // page number starts from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
}
