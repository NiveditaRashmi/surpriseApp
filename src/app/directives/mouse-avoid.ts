// src/app/directives/mouse-avoid.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseAvoid]'
})
export class MouseAvoidDirective {
  @Input('appMouseAvoid') avoid = false;

  private readonly triggerRadius = 120; // px — how close the cursor must get before it jumps
  private readonly edgePadding = 16;    // px — keeps the button fully on-screen
  private readonly cooldownMs = 200;    // minimum time between jumps, avoids jittery re-triggering

  private isFixed = false;
  private lastJumpTime = 0;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.avoid) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - event.clientX;
    const dy = centerY - event.clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const now = Date.now();
    if (distance < this.triggerRadius && now - this.lastJumpTime > this.cooldownMs) {
      this.lastJumpTime = now;
      this.jumpToRandomSpot(rect, event);
    }
  }

  private jumpToRandomSpot(rect: DOMRect, event: MouseEvent): void {
    if (!this.isFixed) {
      this.convertToFixedPosition(rect);
    }

    const maxX = window.innerWidth - rect.width - this.edgePadding;
    const maxY = window.innerHeight - rect.height - this.edgePadding;

    let newX = 0;
    let newY = 0;
    let attempts = 0;

    // re-roll a few times if the new spot happens to still be near the cursor
    do {
      newX = this.edgePadding + Math.random() * Math.max(0, maxX - this.edgePadding);
      newY = this.edgePadding + Math.random() * Math.max(0, maxY - this.edgePadding);
      attempts++;
    } while (
      attempts < 5 &&
      Math.hypot(newX - event.clientX, newY - event.clientY) < this.triggerRadius
    );

    this.renderer.setStyle(this.el.nativeElement, 'left', `${newX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${newY}px`);
  }

  private convertToFixedPosition(rect: DOMRect): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'position', 'fixed');
    this.renderer.setStyle(el, 'left', `${rect.left}px`);
    this.renderer.setStyle(el, 'top', `${rect.top}px`);
    this.renderer.setStyle(el, 'margin', '0');
    this.renderer.setStyle(el, 'zIndex', '1000');
    this.renderer.setStyle(el, 'transition', 'left 0.2s ease-out, top 0.2s ease-out');
    this.isFixed = true;
  }
}