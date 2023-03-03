import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresEventsComponent } from './pres-events.component';

describe('PresEventsComponent', () => {
  let component: PresEventsComponent;
  let fixture: ComponentFixture<PresEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
