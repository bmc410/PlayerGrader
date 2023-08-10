import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useStoreActions, useStoreState } from 'easy-peasy';
import store, { StoreModel } from './models/store';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Player } from './models/playerstate';


function App() {

  const handleAddPerson = (players: Player[]) => {
    //const newPerson = { id: Math.random(), name: 'New Person', age: 0 };
    setPlayers(players);
  };

  const players = useStoreState<StoreModel>(state => state.players)
  //const setPlayers = useStoreActions<StoreModel>(actions => actions.setPlayers);
  //const players = useStoreState(state => state.players.items); // Assuming `items` is the array property in your store model
const setPlayers = useStoreActions(actions => actions..setPlayers); // Assuming `setPlayers` is the action to set players in your store model


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
        if(data)
        handleAddPerson(data.names);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch('categories.json'); // Update the path if needed
        const data = await response.json();
        //setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayers();
    fetchCategories();
  }, []);

  const handleSwiperSlideChange = (swiper: any) => {
    //setActiveSlideIndex(swiper.activeIndex)
    //let player = getPlayerById(swiper.activeIndex + 1)
    //console.log(JSON.stringify(player)); // Update active slide index
  };

  // const addPlayer = (newPlayer: Player) => {
  //   setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  // };

  // const getPlayerById = (id: number): Player | undefined => {
  //   return players.find(player => player.id === id);
  // };

  return (
    <div>

      <div  style={{backgroundColor:'gold'}} className='grid  grid-nogutter flex align-items-center'>
        <div className='col-fixed' style={{width: '2rem'}}>
          <Menu model={items} popup ref={menu} />
          <Button style={{ backgroundColor: 'gold', border: 0, color: 'black', outline: 'none' }} icon="pi pi-bars" onClick={(event) => menu?.current?.toggle(event)} />
        </div>
        <div className='col-11'>
          <Swiper
            loop={true}
            onSlideChange={handleSwiperSlideChange}
          >
            {players.map((player: Player, index: number) => (
              <SwiperSlide key={player.id} onClick={() => console.log(index)}>
                <div style={{ paddingLeft: '20px' }} className="swiper-slide-content">
                  <p>{player.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div >

      {/* <div>
        {categories.map((category, index) => (
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
        ))}      
      </div> */}

    </div >

  );
}

export default App;
