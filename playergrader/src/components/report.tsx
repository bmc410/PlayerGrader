import React, { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';
import { PlayerStat, Category, Player } from '../models/interfaces'; // Adjust the path to your interfaces.ts file
import { getAllCategories, getAllPlayerStats, getAllPlayers } from '../models/dexiedb';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

interface PlayerStatsTableProps {
  categories: Category[];
}

function PlayerStatsTable() {
  const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();
  let items = [
    {
      label: 'Grader', icon: 'pi pi-fw pi-sliders-h', command: () => {
        navigate('/grader');
      }
    },
  ];
  const menu = useRef<Menu>(null);

  useEffect(() => {
    getAllCategories().then(categories => {
      setCategories(categories);
      getAllPlayers().then(players => {
        setPlayers(players);
        getAllPlayerStats().then(stats => {
          setPlayerStats(stats)
        })
      })
    })




  }, []);

  return (
    <>
      <div className='grid align-items-center'>
        <div className='col-fixed' style={{ width: '5rem' }}>
          <Menu model={items} popup ref={menu} />
          <Button style={{ backgroundColor: 'gold', border: 0, color: 'black', outline: 'none' }} icon="pi pi-bars" onClick={(event) => menu?.current?.toggle(event)} />
        </div>
        <div className='col-11'>
          <h3>Player Statistics Table</h3>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style={{ padding: '1em', textAlign: 'left' }}>Player</th>
            {categories.map((category) => (
              <th style={{ padding: '1em', textAlign: 'center' }} key={category.id}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td style={{ padding: '1em', textAlign: 'left' }}>{player.name}</td>
              {categories.map((category) => {
                const statForCategory = playerStats.find(
                  (stat) =>
                    stat.playerid === player.id &&
                    stat.categoryid === category.id
                );
                return (
                  <td style={{ padding: '1em', textAlign: 'center' }} key={category.id}>
                    {statForCategory ? statForCategory.value : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlayerStatsTable;
