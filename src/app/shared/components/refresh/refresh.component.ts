import { Component, output } from '@angular/core';
import {
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
  imports: [IonRefresher, IonRefresherContent],
})
export class RefreshComponent {
  refresh = output<RefresherCustomEvent>();

  handleRefresh(event: RefresherCustomEvent) {
    this.refresh.emit(event);
  }
}
