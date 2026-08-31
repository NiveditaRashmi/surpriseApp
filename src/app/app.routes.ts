// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page';
import { QuestionPageComponent } from './pages/question-page/question-page';
import { PaymentPageComponent } from './pages/payment-page/payment-page';
import { EndingPageComponent } from './pages/ending-page/ending-page';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'question', component: QuestionPageComponent },
  { path: 'payment', component: PaymentPageComponent },
  { path: 'ending', component: EndingPageComponent },
  { path: '**', redirectTo: '' }
];