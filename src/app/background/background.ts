import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgxParticlesModule,
  NgParticlesService
} from '@tsparticles/angular';

import { loadSlim } from '@tsparticles/slim';
import { loadHeartShape } from '@tsparticles/shape-heart';

import type { ISourceOptions } from '@tsparticles/engine';

import { loveThemeOptions } from '../themes/love.theme';
import { christmasThemeOptions } from '../themes/christmas.theme';

interface ThemeVisualConfig {
  particles: ISourceOptions;
  glow: boolean;
  glowColor: string;
}

const THEME_CONFIG: Record<string, ThemeVisualConfig> = {
  love: {
    particles: loveThemeOptions,
    glow: true,
    glowColor: 'rgba(255, 105, 180, 0.12)'
  },

  christmas: {
    particles: christmasThemeOptions,
    glow: true,
    glowColor: 'rgba(180, 220, 255, 0.14)'
  }
};

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule, NgxParticlesModule],
  templateUrl: './background.html',
  styleUrl: './background.css'
})
export class BackgroundComponent implements OnInit {

  @Input() theme = 'love';

  private readonly particlesService =
    inject(NgParticlesService);

  particlesOptions: ISourceOptions = loveThemeOptions;

  showGlow = true;

  glowColor = 'rgba(255, 105, 180, 0.12)';


  async ngOnInit(): Promise<void> {

    const config =
      THEME_CONFIG[this.theme] ??
      THEME_CONFIG['love'];

    this.particlesOptions = config.particles;
    this.showGlow = config.glow;
    this.glowColor = config.glowColor;

    await this.particlesService.init(async (engine) => {
      await loadSlim(engine);
      await loadHeartShape(engine);
    });
  }
}