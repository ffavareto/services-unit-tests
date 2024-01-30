import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  #books: string[] = ['Refactoring', 'Clean Code', 'Domain Driven Design'];

  getBooks(): string[] {
    return this.#books;
  }
}
