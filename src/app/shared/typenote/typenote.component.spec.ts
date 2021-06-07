import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypenoteComponent } from './typenote.component';

describe('TypenoteComponent', () => {
  let component: TypenoteComponent;
  let fixture: ComponentFixture<TypenoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypenoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
