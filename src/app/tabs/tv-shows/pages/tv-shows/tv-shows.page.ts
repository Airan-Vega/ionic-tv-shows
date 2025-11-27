import { Component, inject, OnInit, signal } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/angular/standalone";

import { TvShowsService } from "../../services/tv-shows.service";
import { tap } from "rxjs";

@Component({
  selector: "app-tv-shows",
  templateUrl: "tv-shows.page.html",
  styleUrls: ["tv-shows.page.scss"],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class TvShowsPage implements OnInit {
  tvShowsService = inject(TvShowsService);
  isLoading = signal(false);
  hasError = signal("");

  ngOnInit(): void {
    this.getTvShows();
  }

  private getTvShows() {
    this.tvShowsService
      .getTvShows()
      .pipe(
        tap(() => {
          this.isLoading.set(true);
          this.hasError.set("");
        })
      )
      .subscribe({
        next: (tvShows) => {
          console.log({ tvShows });
          this.isLoading.set(false);
        },
        error: (error: Error) => {
          this.hasError.set(error.message);
          this.isLoading.set(false);
        },
      });
  }
}
