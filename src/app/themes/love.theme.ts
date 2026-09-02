import type { ISourceOptions } from '@tsparticles/engine';

export const loveThemeOptions: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: {
      value: 35,
      density: { enable: true}
    },
    shape: {
      type: 'heart'
    },
    color: {
      value: ['#ff69b4', '#f48fb1', '#f06292', '#ec407a', '#ff80ab', '#ffb6d9', '#e91e63']
    },
    opacity: {
      value: { min: 0.2, max: 0.55 }
    },
    size: {
      value: { min: 7, max: 16 }
    },
    move: {
      enable: true,
      direction: 'top',
      speed: { min: 0.6, max: 1.4 },
      straight: false,
      random: true,
      outModes: { default: 'out' }
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 5 }
    }
  },
  detectRetina: true,
  background: {
    color: 'transparent'
  }
};