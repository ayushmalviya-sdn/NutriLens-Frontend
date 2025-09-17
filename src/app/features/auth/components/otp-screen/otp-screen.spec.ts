import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpScreen } from './otp-screen';

describe('OtpScreen', () => {
  let component: OtpScreen;
  let fixture: ComponentFixture<OtpScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
