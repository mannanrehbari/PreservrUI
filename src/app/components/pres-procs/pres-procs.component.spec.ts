import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresProcsComponent } from './pres-procs.component';

describe('PresProcsComponent', () => {
  let component: PresProcsComponent;
  let fixture: ComponentFixture<PresProcsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresProcsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresProcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
