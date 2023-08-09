// PlayerState.tsx
import { atom } from 'jotai';

export interface Player {
  id: number;
  name: string;
}

export const playerAtom = atom<Player[]>([]);