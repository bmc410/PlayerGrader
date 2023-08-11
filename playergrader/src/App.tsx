import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { clearPlayerStats, fetchAndStoreCategories, fetchAndStorePlayers, getPlayerById, insertOrUpdatePlayerStat } from './models/indexeddb'; // Adjust the path to your indexedDB.ts file
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Category, Player, PlayerStat } from './models/interfaces';
import { Routes, Route } from 'react-router-dom';
import PlayerStatsTable from './report';
import Grader from './grader';


function App() {
 
  const menu = useRef<Menu>(null);
  let items = [
    { label: 'New', icon: 'pi pi-fw pi-plus' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
        deleteDB()
    } }
  ];

  function deleteDB() {
    clearPlayerStats()
  }

  

  useEffect(() => {
    fetchAndStorePlayers()
    fetchAndStoreCategories()
   }, []);

   return (
    <div>
      <Routes>
          <Route path="report" element={<PlayerStatsTable />} />
          <Route path="grader" element={<Grader />} />
      </Routes>

    </div >

  );
}

export default App;
