import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alternatives } from './alternatives';

describe('Alternatives', () => {
  let component: Alternatives;
  let fixture: ComponentFixture<Alternatives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alternatives]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alternatives);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
