import type { ISourceOptions } from '@tsparticles/engine';

export const christmasThemeOptions: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true }
    },
    shape: {
      type: 'character',
      options: {
        character: {
          value: ['❄', '❅', '❆'],
          font: 'Verdana',
          style: '',
          weight: '400',
          fill: true
        }
      }
    },
    color: {
      value: ['#ffffff', '#e0f7ff', '#cdeeff']
    },
    opacity: {
      value: { min: 0.4, max: 0.9 }
    },
    size: {
      value: { min: 10, max: 22 }
    },
    move: {
      enable: true,
      direction: 'bottom',
      speed: { min: 0.8, max: 2.2 },
      straight: false,
      random: true,
      outModes: { default: 'out' }
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 3 }
    },
    wobble: {
      enable: true,
      distance: 8,
      speed: { min: -3, max: 3 }
    }
  },
  detectRetina: true,
  background: {
    color: 'transparent'
  }
};