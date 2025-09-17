import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register';
import { OtpScreen } from './components/otp-screen/otp-screen';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
      ,
      {
        path: 'otp-verification',
        component: OtpScreen
      }
    ]
  }
];
