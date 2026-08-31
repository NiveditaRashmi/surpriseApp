// src/app/pages/question-page/question-page.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizStateService } from '../../quiz-state-service';
import { QuestionOption } from '../../models/question-config.model';
import { getOptionClasses } from '../../utils/options-style';
import { MouseAvoidDirective } from '../../directives/mouse-avoid';

@Component({
  selector: 'app-question-page',
  imports: [CommonModule, MouseAvoidDirective],
  templateUrl: './question-page.html',
  styleUrl: './question-page.css',
})
export class QuestionPageComponent {
  private quizState = inject(QuizStateService);
  
  currentQuestion$ = this.quizState.currentQuestion$;

  getOptionClasses = getOptionClasses;

  onOptionClick(option: QuestionOption): void {
    this.quizState.selectOption(option);
  }
}