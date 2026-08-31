// src/app/app.config.ts
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { routes } from './app.routes';
import { ConfigService } from './config-service';
import { QuizStateService } from './quiz-state-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      const quizState = inject(QuizStateService);
      const config = await firstValueFrom(configService.getConfig());
      console.log('Loaded config:', config);
      quizState.init(config);
    })
  ]
};