import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-otp-screen',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './otp-screen.html',
  styleUrl: './otp-screen.scss'
})
export class OtpScreen implements OnInit {
  otpForm: FormGroup;
  otpDigits: string[] = ['', '', '', '', '', ''];
  isLoading = false;
  canResend = false;
  countdown = 60;
  userEmail = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData && userData.email) {
      this.userEmail = userData.email;
    } else {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    this.startCountdown();
  }

  onDigitInput(event: any, index: number) {
    const value = event.target.value;
    
    if (value && /^\d$/.test(value)) {
      this.otpDigits[index] = value;
      this.updateFormValue();
      
      // Move to next input
      if (index < 5) {
        const nextInput = event.target.nextElementSibling;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === '') {
      this.otpDigits[index] = '';
      this.updateFormValue();
    } else {
      // Clear invalid input
      event.target.value = '';
    }
  }

  onKeyDown(event: any, index: number) {
    // Handle backspace
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
      const prevInput = event.target.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
        this.otpDigits[index - 1] = '';
        this.updateFormValue();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const paste = event.clipboardData?.getData('text') || '';
    const digits = paste.replace(/\D/g, '').slice(0, 6);
    
    for (let i = 0; i < 6; i++) {
      this.otpDigits[i] = digits[i] || '';
    }
    
    this.updateFormValue();
    this.updateInputs();
  }

  updateFormValue() {
    const otpValue = this.otpDigits.join('');
    this.otpForm.patchValue({ otp: otpValue });
  }

  updateInputs() {
    const inputs = document.querySelectorAll('.otp-input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input, index) => {
      input.value = this.otpDigits[index];
    });
  }

  startCountdown() {
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.canResend = true;
        clearInterval(timer);
      }
    }, 1000);
  }

  resendCode() {
    this.canResend = false;
    this.countdown = 60;
    this.startCountdown();
    // Here you would call your API to resend the code
    console.log('Resending code to:', this.userEmail);
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 1000);
    }
  }
}