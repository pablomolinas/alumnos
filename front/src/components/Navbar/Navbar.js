import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavbarItems } from './consts/navbarItems';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const drawerWidth = 240;

  return (
    <Drawer
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#101F33',
        color: 'rgba(255,255,255,0.7)'
        },
    }}
    variant="permanent"
    anchor="left"
    >
        <Toolbar />
        <Divider />
        <List>
            {mainNavbarItems.map((item, index) => (
            <ListItem 
                key={item.id} 
                disablePadding
                onClick={() => navigate(item.route)}>
                <ListItemButton>
                <ListItemIcon sx={{color:'rgba(255,255,255,0.7)'}}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    
    </Drawer>
  )
}

export default Navbar
