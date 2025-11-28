import { Component, input, output } from '@angular/core';
import { IonIcon, IonText, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, refreshOutline } from 'ionicons/icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  imports: [IonButton, IonText, IonIcon],
})
export class ErrorComponent {
  errorMessage = input<string | null>(null);
  retry = output();

  constructor() {
    addIcons({
      'alert-circle-outline': alertCircleOutline,
      'refresh-outline': refreshOutline,
    });
  }
}
