export interface Player {
    id?: number;
    name?: string;
  }

  export interface SwipeState {
    id?: string;
    index?: number;
  }
  
  //export const activeSwipeAtom = atom<PrimitiveAtom<SwipeState>[]>([])
  
  export interface SlideState {
    id?: string;
    index?: number;
  }

  export interface PlayerStat {
    id?: number;
    name?: string;
    playerid?: number;
    categoryid?: number;
    value?: number;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  