import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { map, startWith } from 'rxjs';

const books: string[] = ['Refactoring', 'Clean Code', 'Domain Driven Design'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchService = inject(SearchService);
  inputControl = new FormControl();

  foundBooks = this.inputControl.valueChanges.pipe(
    map((value: string) => {
      const result = this.search(value);

      if (result.length === 0) {
        return books;
      } else {
        return result;
      }
    }),
    startWith(books),
  );

  private search(searchText: string) {
    return this.searchService.search(searchText)
  }
}
