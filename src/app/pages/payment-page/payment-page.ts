// src/app/pages/payment-page/payment-page.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { QuizStateService } from '../../quiz-state-service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.html',
  imports: [],
  styleUrl: './payment-page.css',
})
export class PaymentPageComponent implements OnInit {
  private quizState = inject(QuizStateService);

  ngOnInit(): void {
    // const paymentLinkUrl = this.quizState.getConfig().PaymentLinkUrl;
    // setTimeout(() => {
    //   window.location.href = paymentLinkUrl;
    // }, 1500);
  }

  goToPayment(): void {
    const paymentLinkUrl = this.quizState.getConfig().PaymentLinkUrl;
    window.location.href = paymentLinkUrl;
  }
}