import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPage } from './detail.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TvShowsService } from '../../services/tv-shows.service';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '123']])),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        TvShowsService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
