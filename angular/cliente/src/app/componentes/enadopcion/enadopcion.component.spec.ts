import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnadopcionComponent } from './enadopcion.component';

describe('EnadopcionComponent', () => {
  let component: EnadopcionComponent;
  let fixture: ComponentFixture<EnadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnadopcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
