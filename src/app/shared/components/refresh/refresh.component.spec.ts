import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';

import { RefreshComponent } from './refresh.component';

describe('RefreshComponent', () => {
  let component: RefreshComponent;
  let fixture: ComponentFixture<RefreshComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonRefresher, IonRefresherContent],
    }).compileComponents();

    fixture = TestBed.createComponent(RefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create refresh component', () => {
    expect(component).toBeTruthy();
  });

  it('Should emit the event when handleRefresh is called', () => {
    const refreshSpy = spyOn(component.refresh, 'emit');

    const mockEvent = {
      detail: { complete: () => {} },
    } as RefresherCustomEvent;
    component.handleRefresh(mockEvent);

    expect(refreshSpy).toHaveBeenCalledWith(mockEvent);
  });
});
