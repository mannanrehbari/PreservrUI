import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresSystemComponent } from './pres-system.component';

describe('PresSystemComponent', () => {
  let component: PresSystemComponent;
  let fixture: ComponentFixture<PresSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
