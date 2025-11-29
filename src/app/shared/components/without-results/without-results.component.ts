import { Component } from '@angular/core';
import { IonGrid, IonRow, IonIcon, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-without-results',
  templateUrl: './without-results.component.html',
  styleUrls: ['./without-results.component.scss'],
  imports: [IonCol, IonIcon, IonRow, IonGrid],
})
export class WithoutResultsComponent {
  constructor() {
    addIcons({ 'search-outline': searchOutline });
  }
}
