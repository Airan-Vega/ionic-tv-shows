import { Component, inject, OnInit, signal } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/angular/standalone";
import { TvShowsService } from "../services/tv-shows.service";

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
    this.tvShowsService.getTvShows().subscribe({
      next: (tvShows) => {
        console.log({ tvShows });
        this.isLoading.set(false);
      },
      error: (error) => {
        this.hasError.set("An error occurred while loading the content.");
        this.isLoading.set(false);
      },
    });
  }
}
