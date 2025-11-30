import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonIcon, IonText, IonButton } from '@ionic/angular/standalone';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonButton, IonText, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create error component', () => {
    expect(component).toBeTruthy();
  });
});
