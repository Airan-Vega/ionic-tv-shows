import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonGrid, IonRow, IonIcon, IonCol } from '@ionic/angular/standalone';

import { WithoutResultsComponent } from './without-results.component';

describe('WithoutResultsComponent', () => {
  let component: WithoutResultsComponent;
  let fixture: ComponentFixture<WithoutResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonCol, IonIcon, IonRow, IonGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(WithoutResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create without results component', () => {
    expect(component).toBeTruthy();
  });
});
