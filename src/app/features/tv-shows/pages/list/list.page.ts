import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

import { TvShowsService } from '../../services/tv-shows.service';
import { finalize } from 'rxjs';
import { TVShowsModel } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class ListPage implements OnInit {
  tvShowsService = inject(TvShowsService);
  tvShows = signal<TVShowsModel[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadTvShows();
  }

  private loadTvShows() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.tvShowsService
      .getTvShows()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (tvShows) => {
          console.log({ tvShows });
          this.tvShows.set(tvShows);
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
        },
      });
  }
}
