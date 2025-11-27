import { Component } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-tv-shows",
  templateUrl: "tv-shows.page.html",
  styleUrls: ["tv-shows.page.scss"],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class TvShowsPage {
  constructor() {}
}
