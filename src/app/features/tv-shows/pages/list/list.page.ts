import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonItem,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  RefresherCustomEvent,
  IonActionSheet,
} from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { addIcons } from 'ionicons';

import { TvShowsService } from '../../services/tv-shows.service';
import { TVShowsModel } from '../../models';
import { SharedTvShowsComponents } from '../../components/tv-shows.components';
import { SharedComponents } from '../../../../shared/components/shared.components';
import { divideInHalfArray } from '../../utils';
import { closeOutline, filterOutline, trashOutline } from 'ionicons/icons';
import { Genres, Ratings } from '../../constants';
import { RatingValues } from '../../enum';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  imports: [
    IonActionSheet,
    IonIcon,
    IonToolbar,
    IonButton,
    IonItem,
    IonContent,
    IonHeader,
    IonButtons,
    ...SharedTvShowsComponents,
    ...SharedComponents,
  ],
})
export class ListPage implements OnInit {
  tvShowsService = inject(TvShowsService);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  tvShows = signal<TVShowsModel[]>([]);
  tvShowsFirstRow = signal<TVShowsModel[]>([]);
  tvShowsSecondRow = signal<TVShowsModel[]>([]);
  selectedGender = signal<string | null>(null);
  selectedRating = signal<string | null>(null);
  filteredTvShows = signal<TVShowsModel[]>([]);

  genderActionSheetButtons = [
    {
      text: 'Clear Filter',
      role: 'destructive',
      icon: 'trash-outline',
      handler: () => {
        this.selectedGender.set(null);
        this.filter();
      },
    },
    ...Genres.map((genre) => {
      return {
        ...genre,
        handler: () => {
          this.selectedGender.set(genre.text);
          this.filter();
        },
      };
    }),
    {
      text: 'Cancel',
      icon: 'close-outline',
      role: 'cancel',
    },
  ];

  ratingActionSheetButtons = [
    {
      text: 'Clear Filter',
      role: 'destructive',
      icon: 'trash-outline',
      handler: () => {
        this.selectedRating.set(null);
        this.filter();
      },
    },
    ...Ratings.map((rating) => {
      return {
        ...rating,
        handler: () => {
          this.selectedRating.set(rating.text);
          this.filter();
        },
      };
    }),
    {
      text: 'Cancel',
      icon: 'close-outline',
      role: 'cancel',
    },
  ];

  constructor() {
    addIcons({
      'trash-outline': trashOutline,
      'filter-outline': filterOutline,
      'close-outline': closeOutline,
    });
  }

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows(eventRefresh?: RefresherCustomEvent) {
    if (!eventRefresh) {
      this.isLoading.set(true);
    }
    this.errorMessage.set(null);
    this.tvShowsService
      .getTvShows()
      .pipe(
        finalize(() => {
          if (eventRefresh) {
            eventRefresh.target.complete();
          } else {
            this.isLoading.set(false);
          }
        })
      )
      .subscribe({
        next: (tvShows) => {
          this.tvShows.set(tvShows);
          const { firstArr, secondArr } = divideInHalfArray(tvShows);
          this.tvShowsFirstRow.set(firstArr);
          this.tvShowsSecondRow.set(secondArr);
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
        },
      });
  }

  private filterByGender() {
    this.filteredTvShows.update((tvShows) =>
      tvShows.filter(({ genres }) => genres.includes(this.selectedGender()!))
    );
  }

  private filterByRating() {
    switch (this.selectedRating()) {
      case RatingValues.VERYLOW:
        this.filteredTvShows.update((tvShows) =>
          tvShows.filter(
            ({ rating }) =>
              rating?.average !== null &&
              rating?.average !== undefined &&
              rating.average >= 0 &&
              rating.average <= 2
          )
        );
        break;
      case RatingValues.LOW:
        this.filteredTvShows.update((tvShows) =>
          tvShows.filter(
            ({ rating }) =>
              rating?.average !== null &&
              rating?.average !== undefined &&
              rating.average > 2 &&
              rating.average <= 4
          )
        );
        break;
      case RatingValues.MODERATE:
        this.filteredTvShows.update((tvShows) =>
          tvShows.filter(
            ({ rating }) =>
              rating?.average !== null &&
              rating?.average !== undefined &&
              rating.average > 4 &&
              rating.average <= 6
          )
        );
        break;
      case RatingValues.HIGH:
        this.filteredTvShows.update((tvShows) =>
          tvShows.filter(
            ({ rating }) =>
              rating?.average !== null &&
              rating?.average !== undefined &&
              rating.average > 6 &&
              rating.average <= 8
          )
        );
        break;
      case RatingValues.VERYHIGH:
        this.filteredTvShows.update((tvShows) =>
          tvShows.filter(
            ({ rating }) =>
              rating?.average !== null &&
              rating?.average !== undefined &&
              rating.average > 8 &&
              rating.average <= 10
          )
        );
        break;
    }
  }

  private filter() {
    this.filteredTvShows.set(this.tvShows());

    if (this.selectedGender()) {
      this.filterByGender();
    }
    if (this.selectedRating()) {
      this.filterByRating();
    }

    const { firstArr, secondArr } = divideInHalfArray(this.filteredTvShows());
    this.tvShowsFirstRow.set(firstArr);
    this.tvShowsSecondRow.set(secondArr);
  }
}
