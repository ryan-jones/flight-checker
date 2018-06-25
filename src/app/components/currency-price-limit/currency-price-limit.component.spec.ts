import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPriceLimitComponent } from './currency-price-limit.component';

describe('CurrencyPriceLimitComponent', () => {
  let component: CurrencyPriceLimitComponent;
  let fixture: ComponentFixture<CurrencyPriceLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyPriceLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPriceLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
