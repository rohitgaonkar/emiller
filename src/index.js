import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import common_hin from "./translations/hin/common.json";
import common_en from "./translations/en/common.json";
import common_mar from "./translations/mar/common.json";
import common_kon from "./translations/kon/common.json";

import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import Login from './pages/login/Login';
import ProfilePage from './pages/ProfilePage';
import Signup from './pages/login/Signup';
import SHG from './pages/UpdateSHG';
import App from './App';


i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
      en: {
          common: common_en               // 'common' is our custom namespace
      },
      hin: {
          common: common_hin
      },
      mar: {
          common: common_mar
      },
      kon: {
          common: common_kon
      },
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //<React.StrictMode>
  <I18nextProvider i18n={i18next}>
   
    <App/>

    </I18nextProvider>
  //</React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
