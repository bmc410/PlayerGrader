import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { atom, useAtom, useSetAtom } from 'jotai';
import { playerAtom, Player } from './models/playerstate';
import { Swiper, SwiperSlide } from 'swiper/react';
import { InputText } from 'primereact/inputtext';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { activeSlideAtom, activeSwipeAtom } from './models/slidestate';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { categoryAtom } from './models/categories';


function App() {
  const [players, setPlayers] = useAtom(playerAtom);
  const [categories, setCategories] = useAtom(categoryAtom);
  const [activeSlideIndex, setActiveSlideIndex] = useAtom(activeSlideAtom); // Use the atom
  const [activeSwipeIndex, setActiveSwipeIndex] = useAtom(activeSwipeAtom); // Use the atom

  const menu = useRef<Menu>(null);
  let items = [
    { label: 'New', icon: 'pi pi-fw pi-plus' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' }
  ];

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('players.json'); // Update the path if needed
        const data = await response.json();
        setPlayers(data.names);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch('categories.json'); // Update the path if needed
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayers();
    fetchCategories();
  }, []);

  const handleSwiperSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.activeIndex)
    let player = getPlayerById(swiper.activeIndex + 1)
    console.log(JSON.stringify(player)); // Update active slide index
  };

  const addPlayer = (newPlayer: Player) => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const getPlayerById = (id: number): Player | undefined => {
    return players.find(player => player.id === id);
  };

  return (
    <div>

      <div className='grid'>
        <div className='col'>
          <Menu model={items} popup ref={menu} />
          <Button style={{ backgroundColor: 'gold', border: 0 }} label="Show" icon="pi pi-bars" onClick={(event) => menu?.current?.toggle(event)} />
        </div>
        <div  className='col'>
        <Swiper
          loop={true}
          onSlideChange={handleSwiperSlideChange}
        >
          {players.map((player, index) => (
            <SwiperSlide key={player.id} onClick={() => console.log(index)}>
              <div style={{ paddingLeft: '20px' }} className="swiper-slide-content">
                <p>{player.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {
    categories.map((category, index) => (
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <Typography gutterBottom>{category.name}</Typography>
        <Slider
          defaultValue={5}
          step={0.5}
          min={0}
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
    ))
  }


  {/* <div style={{ marginTop: '20px', padding: '20px' }}>
        <Typography gutterBottom>Passing</Typography>
        <Slider
          defaultValue={5}
          step={0.5}
          min={0}
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
      <div style={{ marginTop: '20px', padding: '20px' }}>
        <Typography gutterBottom>Hitting</Typography>
        <Slider
          defaultValue={5}
          step={0.5}
          min={0}
          max={10}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </div> */}

    </div > </div >

  );
}

export default App;
