import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50RestfulAPI } from './ex50-restful-api';

describe('Ex50RestfulAPI', () => {
  let component: Ex50RestfulAPI;
  let fixture: ComponentFixture<Ex50RestfulAPI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50RestfulAPI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50RestfulAPI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
