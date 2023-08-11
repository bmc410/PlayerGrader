// indexedDB.ts

import { openDB, IDBPDatabase } from 'idb';
import { Category, Player, PlayerStat } from './interfaces' // Adjust the path to your interfaces.ts file

const dbPromise: Promise<IDBPDatabase> = openDB('playergrader', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('categories')) {
      db.createObjectStore('categories', { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains('players')) {
      db.createObjectStore('players', { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains('playerStats')) {
      //db.createObjectStore('playerStats', { keyPath: 'id' });
      const playerIndex = db.createObjectStore('playerStats', { keyPath: 'id', autoIncrement: true });
      playerIndex.createIndex('id', 'id');
    }
  },
});

// indexedDB.ts

// ... (imports and other code)

export const getPlayerStatByPlayerAndCategory = async (
  playerId: number,
  categoryId: number
): Promise<PlayerStat | null> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('playerStats', 'readonly');
    const store = tx.objectStore('playerStats');

    const index = store.index('playerId');
    const playerStats = await index.getAll(IDBKeyRange.only(playerId));

    const playerStat = playerStats.find(stat => stat.categoryid === categoryId);

    return playerStat || null;
  } catch (error) {
    console.error('Error fetching player stat:', error);
    return null;
  }
};


export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('categories', 'readonly');
    const store = tx.objectStore('categories');
    return await store.getAll();
  } catch (error) {
    console.error('Error getting all categories:', error);
    return [];
  }
};

export const updatePlayer = async (player: Player) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('players', 'readwrite');
    const store = tx.objectStore('players');
    await store.put(player);
  } catch (error) {
    console.error('Error updating player:', error);
  }
};

export const updateCategory = async (category: Category) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('categories', 'readwrite');
    const store = tx.objectStore('categories');
    await store.put(category);
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

export const addPlayerStat = async (stat: PlayerStat) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('playerStats', 'readwrite');
    const store = tx.objectStore('playerStats');
    await store.add(stat);
  } catch (error) {
    console.error('Error adding player stat:', error);
  }
};

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('players', 'readonly');
    const store = tx.objectStore('players');
    return await store.getAll();
  } catch (error) {
    console.error('Error getting all players:', error);
    return [];
  }
};

export const getPlayerStatsByPlayerId = async (playerId: number): Promise<PlayerStat[]> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('playerStats', 'readonly');
    const store = tx.objectStore('playerStats');
    const index = store.index('playerId');
    return await index.getAll(playerId);
  } catch (error) {
    console.error('Error getting player stats:', error);
    return [];
  }
};

export const fetchAndStorePlayers = async () => {
  try {
    const response = await fetch('players.json');
    const data = await response.json();
    const players = data.names

    const db = await dbPromise;
    const tx = db.transaction('players', 'readwrite');
    const store = tx.objectStore('players');

    for (const player of players) {
      const existingPlayer = await store.get(player.id);
      if (!existingPlayer) {
        await store.add(player);
      }
    }
  } catch (error) {
    console.error('Error fetching and storing players:', error);
  }
};

export const fetchAndStoreCategories = async () => {
  try {
    const response = await fetch('categories.json');
    const data = await response.json();
    const categories = data.categories

    const db = await dbPromise;
    const tx = db.transaction('categories', 'readwrite');
    const store = tx.objectStore('categories');

    for (const category of categories) {
      const existingCategory = await store.get(category.id);
      if (!existingCategory) {
        await store.add(category);
      }
    }
  } catch (error) {
    console.error('Error fetching and storing category:', error);
  }
};

export const getPlayerById = async (playerId: number): Promise<Player | undefined> => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('players', 'readonly');
    const store = tx.objectStore('players');
    return await store.get(playerId);
  } catch (error) {
    console.error('Error getting player by ID:', error);
    return undefined;
  }
};

export const savePlayerStat = async (value: PlayerStat) => {
  const playerStat: PlayerStat = {
    id: value.id, // Generate a unique ID for the player stat
    playerid: value.playerid,
    categoryid: value.categoryid,
    value: value.value,
  };

  const db = await dbPromise;
  const tx = db.transaction('playerStats', 'readwrite');
  const store = tx.objectStore('playerStats');
  await store.add(playerStat);

  console.log('Saved player stat:', playerStat);
};

export const insertOrUpdatePlayerStat = async (playerStat: PlayerStat) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('playerStats', 'readwrite');
    const store = tx.objectStore('playerStats');

    // Check if playerStat with the same playerid and categoryid exists
    const index = store.index('id');
    await index.get([playerStat.playerid!, playerStat.categoryid!]).then(x => {
      if (x) {
        store.put(playerStat);
      } else {
        store.add(playerStat);
      }
    });

  } catch (error) {
    console.error('Error inserting or updating player stat:', error);
  }
};

export const clearPlayerStats = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction('playerStats', 'readwrite');
    const store = tx.objectStore('playerStats');
    await store.clear();
    console.log('PlayerStats table cleared.');
  } catch (error) {
    console.error('Error clearing PlayerStats table:', error);
  }
};

