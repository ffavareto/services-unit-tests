import { Injectable, inject } from '@angular/core';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  #bookService = inject(BooksService);
  
  public search(searchText: string): string[] {
    const books = this.#bookService.getBooks();

    if (books.length === 0 || this.isEmpty(searchText)) {
      return [];
    }
    
    const sanitizedData = this.removeEmptyValues(books);
    
    return this.filterDataBySearchText(sanitizedData, searchText);
  }
  
  private isEmpty(value: string): boolean {
    return value.trim().length === 0;
  }
  
  private removeEmptyValues(arr: string[]): string[]{
    return arr.filter((value: string) => !this.isEmpty(value));
  }
  
  private toLowerCase(value: string): string {
    return value.toLowerCase();
  }
  
  private filterDataBySearchText(data: string[], searchText: string): string[] {
    return data.filter((item: string) => {
      return this.toLowerCase(item).includes(this.toLowerCase(searchText));
    });
  }
}
