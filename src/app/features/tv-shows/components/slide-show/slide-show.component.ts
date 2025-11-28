import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { TVShowsModel } from '../../models';
import { IonCard } from '@ionic/angular/standalone';
import { SharedPipes } from '../../../../shared/pipes/shared.pipes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCard, RouterLink, ...SharedPipes],
})
export class SlideShowComponent {
  swiperModules = [IonicSlides];
  tvShows = input.required<TVShowsModel[]>();
  navigatePath = input.required<string>();
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
  };
}
