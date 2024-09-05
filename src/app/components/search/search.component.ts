import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  filter,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { UserPost, User } from '../../models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchInput = new FormControl('');
  errorMessage: string = '';
  searchResults$: Observable<{ user: User | null; posts: UserPost[] }> = of({
    user: null,
    posts: [],
  });
  isLoading: boolean = false;
  noResults: boolean = false;

  constructor(private userPostService: UserService) {}

  ngOnInit(): void {
    this.setupSearch();
  }

  setupSearch() {
    this.searchResults$ = this.searchInput.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      filter((term: string | null): term is string => term !== null),
      tap(() => {
        this.isLoading = true;
        this.noResults = false;
      }),
      switchMap((term) => {
        if (term.trim().length < 3 && term.trim().length > 0) {
          this.errorMessage = 'Error: Start with 3 characters and above';
          this.isLoading = false;
          this.noResults = true;
          return of({ user: null, posts: [] });
        } else {
          this.errorMessage = '';
          return this.userPostService.searchCombined(term).pipe(
            tap((results) => {
              this.isLoading = false;

              this.noResults = !results.user && results.posts.length === 0;
            })
          );
        }
      })
    );
  }
}
