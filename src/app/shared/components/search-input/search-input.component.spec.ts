import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonInput, IonIcon } from '@ionic/angular/standalone';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonInput, IonIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create search input component', () => {
    expect(component).toBeTruthy();
  });
});
