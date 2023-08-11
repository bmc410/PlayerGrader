import React, { createRef, useEffect, useRef, useState } from 'react';
import '../App.css'
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
import { Category, Player, PlayerStat, SlideState } from '../models/interfaces';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PlayerStatsTable from './report';
import {
  storePlayer,
  updateSwipeState,
  updateSlideState,
  storePlayerStat,
  getAllCategories,
  getAllPlayers,
  fetchAndStoreCategories,
  fetchAndStorePlayers,
  getPlayerById,
  insertOrUpdatePlayerStat,
  getPlayerStatsByPlayerId,
  clearAllPlayerStats
} from '../models/dexiedb'

function Grader() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activePlayer, setActivePlayer] = useState<Player|undefined>(); // Initial value
  //const [sliderValues, setSliderValue] = useState<number | Number[] | undefined>([]); // Initial value
  const [sliderValues, setSliderValues] = useState(Array(8).fill(0));


  const sv: number[] = []


  let timeout;
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  let items = [
    { label: 'Report', icon: 'pi pi-fw pi-chart-line', command: () => {
      navigate('/report');
    } },
    { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => {
        deleteDB()
    } }
  ];

  function handleSliderChange(id:any, newValue:any) {
    const newSliderValues = [...sliderValues];
    newSliderValues[id] = newValue; 
    setSliderValues(newSliderValues);
    let ps: PlayerStat = {
      playerid: activePlayer?.id,
      categoryid: id+1,
      value: newValue,
      name: activePlayer?.name
    }
    timeout = setTimeout(() => {
      insertOrUpdatePlayerStat(ps)
      }, 3000); 
  };

  function deleteDB() {
   
    clearAllPlayerStats();
  }

  function clearSliders() {
    for (let index = 0; index < 10; index++) {
      sliderValues[index] = 0
    }
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
   

        getAllCategories().then(categories => {
          setCategories(categories);
          getAllPlayers().then(players => {
            setPlayers(players);
            setActivePlayer(players[0])
            resetSliderValues(players[0].id!)
          })
        })
     
  }

  function resetSliderValues(playerId: number) {
   //setActiveSlideIndex(swiper.activeIndex)
   clearSliders()
   let player = getPlayerById(playerId).then (player => {
     setActivePlayer(player)
     getPlayerStatsByPlayerId(player?.id!).then(stats => {
       const newSliderValues = [...sliderValues];
       stats.forEach(stat => {
         newSliderValues[stat.categoryid! - 1] = stat.value; 
       })
       setSliderValues(newSliderValues); 
     })
   })
  }

  const handleSwiperSlideChange = (swiper: any) => {
    resetSliderValues(swiper.activeIndex + 1)
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
              id={'slider_' + index.toString()}
              onChange={(event, newValue) => handleSliderChange(index, newValue)}
              //defaultValue={getSliderValue({index})}
              step={0.5}
              min={0}
              max={10}
              valueLabelDisplay="auto"
              marks={marks}
              value={sliderValues[index]}
            />
          </div>
        ))}      
      </div>
    </div >

  );
}

export default Grader;


