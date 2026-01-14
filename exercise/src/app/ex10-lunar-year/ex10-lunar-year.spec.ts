import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex10LunarYearComponent } from './ex10-lunar-year';

describe('Ex10LunarYearComponent', () => {
  let component: Ex10LunarYearComponent;
  let fixture: ComponentFixture<Ex10LunarYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ex10LunarYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex10LunarYearComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

