import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormnoteComponent } from './formnote.component';

describe('FormnoteComponent', () => {
  let component: FormnoteComponent;
  let fixture: ComponentFixture<FormnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
