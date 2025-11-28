import { Component, inject, OnDestroy, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { TvShowsService } from '../../services/tv-shows.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { TVShowsModel } from '../../models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class SearchPage implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  tvShowsService = inject(TvShowsService);
  searchControl = new FormControl('');
  tvShows = signal<TVShowsModel[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor() {
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((query) => {
          if (!query || query.trim().length === 0) {
            this.clearSearch();
            return;
          }
          this.isLoading.set(true);
          this.errorMessage.set(null);
        }),
        switchMap((query) => this.searchTvShows(query)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (tvShows) => {
          this.tvShows.set(tvShows);
          console.log({ tvShows });
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
        },
      });
  }

  private searchTvShows(query: string | null) {
    if (!query || query.trim().length === 0) {
      return of([]);
    }

    return this.tvShowsService
      .searchTvShow(query)
      .pipe(finalize(() => this.isLoading.set(false)));
  }

  private clearSearch() {
    this.tvShows.set([]);
    this.isLoading.set(false);
    this.errorMessage.set(null);
  }
}
