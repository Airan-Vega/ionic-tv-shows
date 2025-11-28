import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonNote,
  IonChip,
  IonBackButton,
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  map,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { addIcons } from 'ionicons';
import { arrowBack, star } from 'ionicons/icons';

import { TvShowsService } from '../../services/tv-shows.service';
import { TVShowsModel } from '../../models';
import { SharedPipes } from '../../../../shared/pipes/shared.pipes';
import { SharedComponents } from '../../../../shared/components/shared.components';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonNote,
    IonItem,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    ...SharedPipes,
    ...SharedComponents,
  ],
})
export class DetailPage implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private route = inject(ActivatedRoute);
  tvShowsService = inject(TvShowsService);
  tvShow = signal<TVShowsModel | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showId = signal(0);

  constructor() {
    addIcons({ star, arrowBack });
  }

  ngOnInit(): void {
    this.loadTvShow();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadTvShow() {
    const subs = this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        distinctUntilChanged(),
        filter((id) => id !== null && id !== ''),
        tap(() => {
          this.isLoading.set(true);
          this.errorMessage.set('');
        }),
        switchMap((id) => {
          return this.tvShowsService.getTvShow(Number(id));
        })
      )
      .subscribe({
        next: (tvShow) => {
          this.tvShow.set(tvShow);
          this.isLoading.set(false);
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
          this.isLoading.set(false);
        },
      });

    this.subscription.add(subs);
  }
}
