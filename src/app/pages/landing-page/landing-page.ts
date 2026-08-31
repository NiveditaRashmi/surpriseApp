// src/app/pages/landing-page/landing-page.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateService } from '../../quiz-state-service';
import { LandingPage } from '../../models/question-config.model';

@Component({
  imports: [],
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPageComponent {
  private quizState = inject(QuizStateService);
  private router = inject(Router);

  landingPage: LandingPage = this.quizState.getConfig().LandingPage;

  onGetStarted(): void {
    this.quizState.start();
    this.router.navigate(['/question']);
  }
}