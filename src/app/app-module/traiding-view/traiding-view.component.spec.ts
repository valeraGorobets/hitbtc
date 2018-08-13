import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraidingViewComponent } from './traiding-view.component';

describe('TraidingViewComponent', () => {
  let component: TraidingViewComponent;
  let fixture: ComponentFixture<TraidingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraidingViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraidingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
