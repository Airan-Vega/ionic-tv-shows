import { Component, inject, OnDestroy, signal } from '@angular/core';
import { IonContent, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { finalize, Subject } from 'rxjs';

import { TvShowsService } from '../../services/tv-shows.service';
import { TVShowsModel } from '../../models';
import { SearchInputComponent } from '@/app/shared/components/search-input/search-input.component';
import { SharedTvShowsComponents } from '../../components/tv-shows.components';
import { SharedComponents } from '../../../../shared/components/shared.components';
import { divideInHalfArray } from '../../utils';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  imports: [
    IonToolbar,
    IonHeader,
    IonContent,
    SearchInputComponent,
    ...SharedTvShowsComponents,
    ...SharedComponents,
  ],
})
export class SearchPage implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  tvShowsService = inject(TvShowsService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  searchValue = signal('');
  tvShowsFirstRow = signal<TVShowsModel[]>([]);
  tvShowsSecondRow = signal<TVShowsModel[]>([]);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setupSearch(value: string): void {
    this.searchValue.set(value);
    if (!value || value.trim().length === 0) {
      this.tvShowsFirstRow.set([]);
      this.tvShowsSecondRow.set([]);
      return;
    }

    this.isLoading.set(true);
    this.tvShowsService
      .searchTvShow(value)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tvShows) => {
          const { firstArr, secondArr } = divideInHalfArray(tvShows);
          this.tvShowsFirstRow.set(firstArr);
          this.tvShowsSecondRow.set(secondArr);
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
        },
      });
  }
}
