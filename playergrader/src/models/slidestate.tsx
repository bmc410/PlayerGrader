// PlayerState.tsx
import { atom } from 'jotai';

export interface SlideState {
  index: number;
}

export const activeSlideAtom = atom<SlideState[]>([]);