import Dexie from 'dexie';
import { Player, SwipeState, SlideState, PlayerStat, Category } from './interfaces'; // Adjust the path to your interfaces.ts file

class MyAppDatabase extends Dexie {
  players: Dexie.Table<Player, number>;
  swipeStates: Dexie.Table<SwipeState, number>;
  slideStates: Dexie.Table<SlideState, number>;
  playerStats: Dexie.Table<PlayerStat, number>;
  categories: Dexie.Table<Category, number>;

  constructor() {
    super('playergraderDB');
    this.version(1).stores({
      players: '++id',
      swipeStates: '++id',
      slideStates: '++id',
      playerStats: '++id, playerid, categoryid, name, value',
      categories: 'id',
    });

    this.players = this.table('players');
    this.swipeStates = this.table('swipeStates');
    this.slideStates = this.table('slideStates');
    this.playerStats = this.table('playerStats');
    this.categories = this.table('categories');
  }
}

const db = new MyAppDatabase();

export const storePlayer = async (player: Player): Promise<void> => {
  await db.players.put(player);
};

export const updateSwipeState = async (swipeState: SwipeState): Promise<void> => {
  await db.swipeStates.clear();
  await db.swipeStates.put(swipeState);
};

export const updateSlideState = async (slideState: SlideState): Promise<void> => {
  await db.slideStates.clear();
  await db.slideStates.put(slideState);
};

export const storePlayerStat = async (playerStat: PlayerStat): Promise<void> => {
  await db.playerStats.put(playerStat);
};

export const getAllCategories = async (): Promise<Category[]> => {
  return await db.categories.toArray();
};

export const getAllPlayers = async (): Promise<Player[]> => {
  return await db.players.toArray();
};

export const getPlayerStatsByPlayerAndCategory = async (
  playerId: number,
  categoryId: number
): Promise<PlayerStat | undefined> => {
  return await db.playerStats
    .where({ playerid: playerId, categoryid: categoryId })
    .first();
};

export  function fetchAndStoreCategories() {
  try {
    db.categories.count().then(async x => {
      if(x == 0) {
        const response = await fetch('categories.json');
        const data = await response.json();
        const categories = data.categories;
        db.categories.bulkAdd(categories);
      }
    })

   
   

   } catch (error) {
    console.error('Error fetching and storing category:', error);
  }
};

export const fetchAndStorePlayers = async () => {
  try {
    if(await db.players.count() == 0) {
      const response = await fetch('players.json');
      const data = await response.json();
      const players = data.names;
      db.players.bulkAdd(players);
    }
   

   } catch (error) {
    console.error('Error fetching and storing players:', error);
  }
};

export const getPlayerById = async (playerId: number): Promise<Player | undefined> => {
  try {
    await db.open();
    const player = await db.players.get(playerId);
    await db.close();
    return player;
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    return undefined;
  }
};

export const clearPlayerStatsTable = async (): Promise<void> => {
  try {
    await db.open();
    await db.playerStats.clear();
    await db.close();
  } catch (error) {
    console.error('Error clearing playerStats table:', error);
  }
};

export const insertOrUpdatePlayerStat = async (
  playerStat: PlayerStat
): Promise<void> => {
  try {
    await db.open();
    
    const existingRecord = await db.playerStats
      .where({
        playerid: playerStat.playerid,
        categoryid: playerStat.categoryid,
      })
      .first();
    
    if (existingRecord) {
      await db.playerStats.update(existingRecord.id!, playerStat);
    } else {
      await db.playerStats.add(playerStat);
    }
    
    await db.close();
  } catch (error) {
    console.error('Error inserting or updating playerStat:', error);
  }
};
