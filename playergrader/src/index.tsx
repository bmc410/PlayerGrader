import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Player } from './models/playerstate'


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';     
import { StoreProvider, createStore } from 'easy-peasy';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const store = createStore({
  players: [],
  categories: []
});

root.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
