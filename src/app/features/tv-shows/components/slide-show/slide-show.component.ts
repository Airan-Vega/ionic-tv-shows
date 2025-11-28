import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { IonCard } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { TVShowsModel } from '../../models';
import { SharedPipes } from '../../../../shared/pipes/shared.pipes';

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
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
  };
}
