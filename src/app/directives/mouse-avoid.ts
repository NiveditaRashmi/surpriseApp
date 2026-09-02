// src/app/directives/mouse-avoid.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appMouseAvoid]'
})
export class MouseAvoidDirective implements OnInit, OnDestroy {
  @Input('appMouseAvoid') avoid = false;

  private readonly noticeRadius = 220;
  private readonly triggerRadius = 120;
  private readonly edgePadding = 16;
  private readonly cooldownMs = 250;

  private isFixed = false;
  private isNervous = false;
  private lastJumpTime = 0;
  private faceEl: HTMLElement | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const face = this.renderer.createElement('span');
    this.renderer.addClass(face, 'shy-face');
    this.renderer.setProperty(face, 'textContent', '🙂');
    this.renderer.setStyle(this.el.nativeElement, 'position', this.el.nativeElement.style.position || 'relative');
    this.renderer.appendChild(this.el.nativeElement, face);
    this.faceEl = face;
  }

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

    if (distance < this.triggerRadius) {
      const now = Date.now();
      if (now - this.lastJumpTime > this.cooldownMs) {
        this.lastJumpTime = now;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        this.flee(rect, event, angle);
      }
    } else if (distance < this.noticeRadius) {
      this.setNervous(true);
    } else {
      this.setNervous(false);
    }
  }

  private setNervous(nervous: boolean): void {
    if (nervous === this.isNervous) {
      return;
    }
    this.isNervous = nervous;
    const el = this.el.nativeElement;

    if (nervous) {
      this.renderer.addClass(el, 'shy-nervous');
      if (this.faceEl) {
        this.renderer.setProperty(this.faceEl, 'textContent', '😳');
        this.renderer.addClass(this.faceEl, 'visible');
      }
    } else {
      this.renderer.removeClass(el, 'shy-nervous');
      if (this.faceEl) {
        this.renderer.removeClass(this.faceEl, 'visible');
      }
    }
  }

  private flee(rect: DOMRect, event: MouseEvent, tiltAngle: number): void {
    if (!this.isFixed) {
      this.escapeToBody(rect);
    }

    const el = this.el.nativeElement;
    this.setNervous(false);

    this.renderer.setStyle(el, '--flee-tilt', `${tiltAngle * 0.15}deg`);
    this.renderer.addClass(el, 'shy-flee');
    if (this.faceEl) {
      this.renderer.setProperty(this.faceEl, 'textContent', '🙈');
      this.renderer.addClass(this.faceEl, 'visible');
    }
    setTimeout(() => {
      this.renderer.removeClass(el, 'shy-flee');
      if (this.faceEl) {
        this.renderer.removeClass(this.faceEl, 'visible');
      }
    }, 350);

    const width = rect.width;
    const height = rect.height;
    const maxX = Math.max(this.edgePadding, window.innerWidth - width - this.edgePadding);
    const maxY = Math.max(this.edgePadding, window.innerHeight - height - this.edgePadding);

    let newX = 0;
    let newY = 0;
    let attempts = 0;

    do {
      newX = this.edgePadding + Math.random() * (maxX - this.edgePadding);
      newY = this.edgePadding + Math.random() * (maxY - this.edgePadding);
      attempts++;
    } while (
      attempts < 5 &&
      Math.hypot(newX - event.clientX, newY - event.clientY) < this.triggerRadius
    );

    newX = Math.min(Math.max(newX, 0), window.innerWidth - width);
    newY = Math.min(Math.max(newY, 0), window.innerHeight - height);

    this.renderer.setStyle(el, 'left', `${newX}px`);
    this.renderer.setStyle(el, 'top', `${newY}px`);
  }

  private escapeToBody(rect: DOMRect): void {
    const el = this.el.nativeElement;

    this.renderer.setStyle(el, 'animation', 'none');
    this.renderer.setStyle(el, 'position', 'fixed');
    this.renderer.setStyle(el, 'left', `${rect.left}px`);
    this.renderer.setStyle(el, 'top', `${rect.top}px`);
    this.renderer.setStyle(el, 'margin', '0');
    this.renderer.setStyle(el, 'zIndex', '1000');
    this.renderer.setStyle(el, 'transition', 'left 0.2s ease-out, top 0.2s ease-out');

    this.renderer.appendChild(document.body, el);
    this.isFixed = true;
  }

  ngOnDestroy(): void {
    // no need to restore original position — this element is being torn down regardless.
    // just guarantee it's removed from wherever it currently lives (likely document.body).
    const el = this.el.nativeElement;
    if (this.isFixed && el.parentNode) {
      try {
        this.renderer.removeChild(el.parentNode, el);
      } catch {
        // already removed by Angular's own teardown — safe to ignore
      }
    }
  }
}