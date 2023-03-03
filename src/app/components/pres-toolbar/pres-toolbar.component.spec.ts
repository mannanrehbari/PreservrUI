import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresToolbarComponent } from './pres-toolbar.component';

describe('PresToolbarComponent', () => {
  let component: PresToolbarComponent;
  let fixture: ComponentFixture<PresToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
