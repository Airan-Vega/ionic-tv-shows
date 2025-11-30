import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonCard } from '@ionic/angular/standalone';

import { SlideShowComponent } from './slide-show.component';
import { RouterLink } from '@angular/router';
import { SharedPipes } from '@/app/shared/pipes/shared.pipes';

describe('SlideShowComponent', () => {
  let component: SlideShowComponent;
  let fixture: ComponentFixture<SlideShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SlideShowComponent, IonCard, RouterLink, ...SharedPipes],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideShowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tvShows', []);
    fixture.detectChanges();
  }));

  it('Should create the slide show component', () => {
    expect(component).toBeTruthy();
  });
});
