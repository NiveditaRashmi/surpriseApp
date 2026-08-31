// src/app/services/config.service.ts
import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { SurpriseAppConfig } from './models/question-config.model';

@Service()
export class ConfigService {
  private http = inject(HttpClient);
  private config$?: Observable<SurpriseAppConfig>;

  getConfig(): Observable<SurpriseAppConfig> {
    if (!this.config$) {
      this.config$ = this.http
        .get<SurpriseAppConfig>('/config.json')
        .pipe(shareReplay(1));
    }
    return this.config$;
  }
}