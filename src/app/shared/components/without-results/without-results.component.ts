import { Component, input } from '@angular/core';
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
  message = input(
    'Try adjusting your search terms or using more general words.'
  );
  constructor() {
    addIcons({ 'search-outline': searchOutline });
  }
}
