import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { finalize } from 'rxjs';

import { TvShowsService } from '../../services/tv-shows.service';
import { TVShowsModel } from '../../models';
import { SharedTvShowsComponents } from '../../components/tv-shows.components';
import { SharedComponents } from '../../../../shared/components/shared.components';
import { RefreshComponent } from '@/app/shared/components/refresh/refresh.component';
import { divideInHalfArray } from '../../utils';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  imports: [IonContent, ...SharedTvShowsComponents, ...SharedComponents],
})
export class ListPage implements OnInit {
  tvShowsService = inject(TvShowsService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  tvShowsFirstRow = signal<TVShowsModel[]>([]);
  tvShowsSecondRow = signal<TVShowsModel[]>([]);

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.tvShowsService
      .getTvShows()
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
