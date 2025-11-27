import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/angular/standalone";
import { TvShowsService } from "../../services/tv-shows.service";
import { ActivatedRoute } from "@angular/router";
import {
  distinctUntilChanged,
  filter,
  map,
  Subscription,
  switchMap,
  tap,
} from "rxjs";

@Component({
  selector: "app-tv-show-detail",
  templateUrl: "./tv-show-detail.page.html",
  styleUrls: ["./tv-show-detail.page.scss"],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class TvShowDetailPage implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private route = inject(ActivatedRoute);
  tvShowsService = inject(TvShowsService);
  isLoading = signal(false);
  hasError = signal("");
  showId = signal(0);

  ngOnInit(): void {
    this.getTvShow();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getTvShow() {
    const subs = this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        distinctUntilChanged(),
        filter((id) => id !== null && id !== ""),
        tap(() => {
          this.isLoading.set(true);
          this.hasError.set("");
        }),
        switchMap((id) => {
          return this.tvShowsService.getTvShow(Number(id));
        })
      )
      .subscribe({
        next: (tvShow) => {
          console.log({ tvShow });
          this.isLoading.set(false);
        },
        error: (error: Error) => {
          this.hasError.set(error.message);
          this.isLoading.set(false);
        },
      });

    this.subscription.add(subs);
  }
}
