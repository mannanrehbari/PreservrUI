import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresProcComponent } from './pres-proc.component';

describe('PresProcComponent', () => {
  let component: PresProcComponent;
  let fixture: ComponentFixture<PresProcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresProcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresProcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
