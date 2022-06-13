import React, {useState} from 'react';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from '../BasicMenu/BasicMenu';

const NotificationBell = ({ iconColor, notifications }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    const newNotifications = `Tienes ${notifications.length} notificacion/es.`;
    const noNotifications = "No hay notificaciones."
    

    return (
        <>
            <Tooltip title={notifications.length ? newNotifications : noNotifications}>
                <IconButton 
                    aria-label="bell"
                    color={iconColor}
                    onClick={notifications.length ? handleOpen : null}
                    anchorel={anchorEl}
                >
                    <Badge badgeContent={notifications.length} color="error">
                        <NotificationsIcon color="action" />
                    </Badge>
                </IconButton>                
            </Tooltip>
            <BasicMenu 
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            /> 
        </>
  )
}

export default NotificationBell
