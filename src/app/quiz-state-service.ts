// src/app/services/quiz-state.service.ts
import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SurpriseAppConfig, Question, QuestionOption } from './models/question-config.model';

@Service()
export class QuizStateService {
  private router = inject(Router);

  private config!: SurpriseAppConfig;
  private currentQuestionSubject = new BehaviorSubject<Question | null>(null);
  currentQuestion$ = this.currentQuestionSubject.asObservable();

  init(config: SurpriseAppConfig): void {
    console.log('QuizStateService.init called with config:', config);
    this.config = config;
  }

  start(): void {
    console.log('Config at start():', this.config);
    console.log('StartQuestion value:', this.config?.StartQuestionId);
    const firstQuestion = this.findQuestion(this.config.StartQuestionId);
    console.log('Found question:', firstQuestion);
    this.currentQuestionSubject.next(firstQuestion ?? null);
  }

  selectOption(option: QuestionOption): void {
    if (!option.Clickable) {
      return;
    }

    // undefined (not null) now means "go to payment"
    if (!option.NextQuestionId) {
      this.router.navigate(['/payment']);
      return;
    }

    const nextQuestion = this.findQuestion(option.NextQuestionId);
    console.log(`Navigating to next question with Id "${option.NextQuestionId}":`, nextQuestion);
    if (!nextQuestion) {
      console.error(`Question with Id "${option.NextQuestionId}" not found in config.`);
      this.router.navigate(['/payment']);
      return;
    }

    this.currentQuestionSubject.next(nextQuestion);
  }

  getConfig() {
    console.log('QuizStateService.getConfig called', this.config);
    return this.config;
  }

  private findQuestion(id: string): Question | undefined {
    return this.config.Questions.find(q => q.Id === id);
  }
}