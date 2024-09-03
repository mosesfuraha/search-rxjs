import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Observable, of, combineLatest } from 'rxjs';
import { UserPost } from '../../models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchInput = new FormControl('');
  errorMessage: string = '';
  allPosts$: Observable<UserPost[]> = of([]);
  filteredPosts$: Observable<UserPost[]> = of([]);
  userPosts: any;

  constructor(private userPostService: UserService) {}

  ngOnInit(): void {
    this.loadAllPosts();
    this.setupSearch();
  }

  loadAllPosts() {
    this.allPosts$ = this.userPostService.getUserPosts();
  }

  setupSearch() {
    this.filteredPosts$ = combineLatest([
      this.allPosts$,
      this.searchInput.valueChanges.pipe(
        debounceTime(1500),
        startWith(''),
        filter((term: string | null): term is string => term !== null)
      ),
    ]).pipe(
      switchMap(([posts, term]) => {
        if (term.trim().length < 3 && term.trim().length > 0) {
          this.errorMessage = 'Error: Start with 3 characters and above';
          return of([]);
        } else {
          this.errorMessage = '';
          return of(
            posts.filter(
              (post) =>
                post.title.toLowerCase().includes(term.toLowerCase()) ||
                post.description.toLowerCase().includes(term.toLowerCase())
            )
          );
        }
      })
    );
  }
}
