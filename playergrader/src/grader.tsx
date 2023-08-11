import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { SlideMenu } from 'primereact/slidemenu';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
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
import {
  storePlayer,
  updateSwipeState,
  updateSlideState,
  storePlayerStat,
  getAllCategories,
  getPlayerStatsByPlayerAndCategory,
  getAllPlayers,
  fetchAndStoreCategories,
  fetchAndStorePlayers
} from './models/dexiedb'

function Grader() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player|undefined>(); // Initial value
  let timeout;
  const handleSliderChange = (id:any, newValue:any) => {
    let ps: PlayerStat = {
      playerid: activePlayer?.id,
      categoryid: id+1,
      value: newValue,
      name: activePlayer?.name
    }
    timeout = setTimeout(() => {
      //insertOrUpdatePlayerStat(ps)
      }, 1000); 
  };

  const menu = useRef<Menu>(null);
  let items = [
    { label: 'New', icon: 'pi pi-fw pi-plus' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
        deleteDB()
    } }
  ];

  function deleteDB() {
    //clearPlayerStats()
  }

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
    getdata()
  
  }, []);

 function getdata() {
    fetchAndStoreCategories()
    fetchAndStorePlayers()

        getAllCategories().then(categories => {
          setCategories(categories);
          getAllPlayers().then(players => {
            setPlayers(players);
          })
        })
     
  }

  const handleSwiperSlideChange = (swiper: any) => {
    //setActiveSlideIndex(swiper.activeIndex)
    // let player = getPlayerById(swiper.activeIndex + 1).then (player => {
    //   setActivePlayer(player)
    // })
  };

  function getSliderValue(index:any) {
    // getPlayerStatByPlayerAndCategory(activePlayer?.id!, index+1).then(x => {
    //   if(x)
    //     return x
    // })
    return 0
  }

  
  

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
            {players?.map((player: Player, index: number) => (
              <SwiperSlide key={player.id} onClick={() => console.log(index)}>
                <div style={{ paddingLeft: '20px' }} className="swiper-slide-content">
                  <p>{player.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div >

      <div>
        {categories?.map((category, index) => (
          <div style={{ marginTop: '20px', padding: '20px' }}>
            <Typography gutterBottom>{category.name}</Typography>
            <Slider
              id={index.toString()}
              onChange={(event, newValue) => handleSliderChange(index, newValue)}
              //defaultValue={getSliderValue({index})}
              step={0.5}
              min={0}
              max={10}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </div>
        ))}      
      </div>
    </div >

  );
}

export default Grader;
