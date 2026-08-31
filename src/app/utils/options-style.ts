// // src/app/utils/option-style.util.ts
// import { ButtonMovement } from '../models/question-config.model';

// const STYLE_TO_BG: Record<string, string> = {
//   red: 'bg-coral',
//   blue: 'bg-teal',
//   green: 'bg-sunshine',
//   gray: 'bg-gray-300'
// };

// const MOVEMENT_TO_ANIMATION: Record<ButtonMovement, string> = {
//   dancing: 'animate-dance',
//   bouncing: 'animate-bounce',
//   spinning: 'animate-spin',
//   none: ''
// };

// export function getOptionClasses(style: string, movement: ButtonMovement, clickable: boolean): string {
//   const bg = STYLE_TO_BG[style] ?? 'bg-gray-300';
//   const animation = clickable ? MOVEMENT_TO_ANIMATION[movement] : '';
//   const cursor = clickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-40';
//   return `${bg} ${animation} ${cursor} transition-transform duration-200`;
// }

// src/app/utils/options-style.ts
import { ButtonMovement } from '../models/question-config.model';

const STYLE_TO_BG: Record<string, string> = {
  red: 'bg-coral',
  blue: 'bg-teal',
  green: 'bg-sunshine',
  gray: 'bg-gray-300'
};

const MOVEMENT_TO_ANIMATION: Record<ButtonMovement, string> = {
  dancing: 'animate-dance',
  bouncing: 'animate-bounce',
  spinning: 'animate-spin',
  none: ''
};

export function getOptionClasses(
  style: string,
  movement: ButtonMovement,
  clickable: boolean,
  dodge: boolean = false
): string {
  const bg = STYLE_TO_BG[style] ?? 'bg-gray-300';

  if (!clickable) {
    // genuinely disabled: grayed out, no animation, no hover response
    return `bg-gray-300 opacity-40 grayscale cursor-not-allowed`;
  }

  const animation = MOVEMENT_TO_ANIMATION[movement];
  const cursor = dodge ? 'cursor-pointer' : 'cursor-pointer hover:scale-105';

  return `${bg} ${animation} ${cursor} transition-transform duration-200`;
}