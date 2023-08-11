import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { PlayerStat, Category, Player } from '../models/interfaces'; // Adjust the path to your interfaces.ts file

interface PlayerStatsTableProps {
  categories: Category[];
}

function PlayerStatsTable() {
  const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchPlayerStats() {
      const db = await openDB('playergrader', 1); // Open the existing database
      const tx = db.transaction('playerStats', 'readonly');
      const store = tx.objectStore('playerStats');

      const stats: PlayerStat[] = await store.getAll();

      setPlayerStats(stats);

      async function fetchCategories() {
        // const fetchedCategories = await getAllCategories();
        // setCategories(fetchedCategories);
      }
      async function fetchPlayers() {
        // const fetchedPlayers = await getAllPlayers();
        // setPlayers(fetchedPlayers);
      }

      fetchPlayers();
      fetchCategories();

    }

    fetchPlayerStats();
  }, []);

  return (
    <div>
      <h2>Player Statistics Table</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {categories.map((category) => (
              <th key={category.id}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerStats.map((playerStat) => (
            <tr key={playerStat.id}>
              <td>{playerStat.name}</td>
              {categories.map((category) => {
                const statForCategory = playerStats.find(
                  (stat) =>
                    stat.playerid === playerStat.playerid &&
                    stat.categoryid === category.id
                );
                return (
                  <td key={category.id}>
                    {statForCategory ? statForCategory.value : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsTable;
