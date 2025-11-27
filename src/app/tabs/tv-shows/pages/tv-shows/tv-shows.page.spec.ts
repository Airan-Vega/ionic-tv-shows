import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TvShowsPage } from "./tv-shows.page";

describe("TvShowsPage", () => {
  let component: TvShowsPage;
  let fixture: ComponentFixture<TvShowsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TvShowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
