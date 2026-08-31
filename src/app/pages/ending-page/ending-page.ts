// src/app/pages/ending-page/ending-page.component.ts
import { Component, inject } from '@angular/core';
import { QuizStateService } from '../../quiz-state-service';
import { EndingPage } from '../../models/question-config.model';

@Component({
  selector: 'app-ending-page',
  templateUrl: './ending-page.html',
  styleUrl: './ending-page.css',
})
export class EndingPageComponent {
  private quizState = inject(QuizStateService);
  endingPage: EndingPage = this.quizState.getConfig().EndingPage;
}