import { Component, effect, input, linkedSignal, output } from '@angular/core';
import { IonInput, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, search } from 'ionicons/icons';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  imports: [IonInput, IonIcon],
})
export class SearchInputComponent {
  debounceTime = input(500);
  initialValue = input<string>('');
  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  constructor() {
    addIcons({ search, close });
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
