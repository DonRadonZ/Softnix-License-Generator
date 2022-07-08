import * as React from 'react';
//import { NavLink } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import {
    Box,
    Tooltip
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Menu } from '@mui/material';


// const user = ['Profile','Account','Settings','Logout']


function HeaderUserbox(){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';


    return(
        <Box sx={{flexGrow: 0}}>
            <Tooltip title= "Account">
        <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        >
            <AccountCircle/>
        </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal:'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
           <MenuItem onClick={handleMenuClose}>Profile</MenuItem> 
           <MenuItem onClick={handleMenuClose}>Messenger</MenuItem> 
           <MenuItem onClick={handleMenuClose}>Setting</MenuItem> 
           <MenuItem onClick={handleMenuClose}>Logout</MenuItem> 
        </Menu>
        </Box>  

    );
}
 export default HeaderUserbox;