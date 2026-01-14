import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex10LunarYear } from './ex10-lunar-year';

describe('Ex10LunarYear', () => {
  let component: Ex10LunarYear;
  let fixture: ComponentFixture<Ex10LunarYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex10LunarYear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex10LunarYear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
