import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonSpinner } from '@ionic/angular/standalone';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create loading component', () => {
    expect(component).toBeTruthy();
  });
});
