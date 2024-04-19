// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="29189875794-0m4u2oencjl0j14ftdtumelgs3uqbusl.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <GoogleOAuthProvider clientId="926345159080-6ci647ak6ecs2ht2m98kdg4m7vqu5vks.apps.googleusercontent.com">
//       <App />
//     </GoogleOAuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
