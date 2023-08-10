import { createStore, action, Action } from 'easy-peasy';
import { Player } from './playerstate';
import { PlayerStat } from './stats';
import { SwipeState } from './slidestate';
import { SlideState } from './slidestate';
import { Category } from './categories';

export interface StoreModel {
  players: Player[];
  setPlayers: Action<StoreModel, Player[]>;
  playerStats: PlayerStat[];
  setPlayerStats: Action<StoreModel, PlayerStat[]>;
  categories: Category[];
  setCategories: Action<StoreModel, Category[]>;
  swipeState: SwipeState;
  setSwipeState: Action<StoreModel, SwipeState>;

}


const store = createStore<StoreModel>({
    players: [],
    setPlayers: action((state, players) => {
      state.players = players;
    }),
  
    playerStats: [],
    setPlayerStats: action((state, playerStats) => {
      state.playerStats = playerStats;
    }),
  
    categories: [],
    setCategories: action((state, categories) => {
      state.categories = categories;
    }),
  
    swipeState: {},
    setSwipeState: action((state, swipeState) => {
      state.swipeState = swipeState;
    }),
  });

export default store;
