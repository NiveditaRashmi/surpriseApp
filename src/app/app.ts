import { Component, inject, OnInit, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './background/background';
import {QuizStateService} from './quiz-state-service';

@Component({
  imports: [RouterOutlet, BackgroundComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('surpriseApp');
  private quizState = inject(QuizStateService);
  private renderer = inject(Renderer2);

  theme = 'love';

  ngOnInit(): void {
    this.theme = this.quizState.getConfig()?.Theme ?? 'love';
    this.renderer.addClass(document.body, `theme-${this.theme}`);
  }
}
