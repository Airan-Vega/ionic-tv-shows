import { Component, input, output, ViewChild } from '@angular/core';
import { IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss'],
  imports: [IonRefresher, IonRefresherContent],
})
export class RefreshComponent {
  isLoading = input.required<boolean>();
  refresh = output<void>();

  @ViewChild(IonRefresher) refresher?: IonRefresher;

  handleRefresh() {
    this.refresh.emit();
  }
}
