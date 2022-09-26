import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
//import AppComponent from './components-app';
//import Agenda from './agenda-personas';
//import Axios from './axios';
//import AgendaEfect from './agenda-personas-useEfect';
//import ApiCountries from './api-countries';
import AgendaCRUD from './agenda-personas-crud';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AgendaCRUD/>
);