// PlayerState.tsx
import { atom } from 'jotai';

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
}

export const playerAtom = atom<Player[]>([]);