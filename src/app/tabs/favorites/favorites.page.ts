import { Component } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/angular/standalone";

@Component({
  selector: "app-favorites",
  templateUrl: "favorites.page.html",
  styleUrls: ["favorites.page.scss"],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class FavoritesPage {
  constructor() {}
}
