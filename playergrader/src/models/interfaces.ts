export interface Player {
    id?: number;
    name?: string;
  }

  export interface SwipeState {
    index?: number;
  }
  
  //export const activeSwipeAtom = atom<PrimitiveAtom<SwipeState>[]>([])
  
  export interface SlideState {
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
  