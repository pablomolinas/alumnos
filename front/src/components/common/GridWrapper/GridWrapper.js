import React from 'react'
import Grid from '@mui/material/Grid';
import {gridStyles} from './styles.js';

const GridWrapper = ({children}) => {
    
  return (
    <Grid item xs={12} sx={gridStyles}>
      {children}
    </Grid>
  )
}

export default GridWrapper
