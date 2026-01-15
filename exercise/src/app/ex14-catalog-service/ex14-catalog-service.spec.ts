import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex14CatalogService } from './ex14-catalog-service';

describe('Ex14CatalogService', () => {
  let component: Ex14CatalogService;
  let fixture: ComponentFixture<Ex14CatalogService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex14CatalogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex14CatalogService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
