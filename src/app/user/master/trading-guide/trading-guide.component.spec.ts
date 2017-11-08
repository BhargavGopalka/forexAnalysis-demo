import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingGuideComponent } from './trading-guide.component';

describe('TradingGuideComponent', () => {
  let component: TradingGuideComponent;
  let fixture: ComponentFixture<TradingGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
