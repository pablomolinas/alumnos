import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Alumnos from './pages/Alumnos/Alumnos';
import Materias from './pages/Materias/Materias';
import { ThemeProvider } from '@mui/material/styles';
import { dashboardTheme } from './dashboardTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="materias" element={<Materias />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

