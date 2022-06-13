import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useLocation } from 'react-router-dom'; 

function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, ' ');
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet />
    </Grid>
  );
}

export default App;
