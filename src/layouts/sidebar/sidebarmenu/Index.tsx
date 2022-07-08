import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
import { NavLink as  useLinkClickHandler } from 'react-router-dom';
import Link from '@mui/material/Link';


import { 
  // ListSubheader,
  // alpha,
  // Box,
  List,
  // Button,
  // ListItem,
  // Card
 } from '@mui/material';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import LayersIcon from '@mui/icons-material/Layers';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import DashboardIcon from '@mui/icons-material/Dashboard';




function SidebarMenu(){
  

  return(
    <>
      <List component="div">
        <ListItemButton>
       <ListItemIcon>
        <DashboardIcon/>
       </ListItemIcon>
       <Link href ="/" underline='none'>
        <ListItemText primary="Dashboard" color="default" />
        </Link>
       </ListItemButton> 
       <ListItemButton>
       <ListItemIcon>
        <MessageIcon/>
       </ListItemIcon>
       <ListItemText primary="Messenger" />
       </ListItemButton>
       <ListItemButton>
       <ListItemIcon>
        <PeopleIcon/>
       </ListItemIcon>
       <ListItemText primary="Contact" />
       </ListItemButton>
      <Divider/> 

      
      <ListItemButton>
       <ListItemIcon>
        <AssignmentIcon/>
       </ListItemIcon>
       <Link href ="/LicenseList" underline="none">
       <ListItemText primary="License List" color="default"/>
       </Link>
       </ListItemButton>
       <ListItemButton>
       <ListItemIcon>
        <FactCheckIcon/>
       </ListItemIcon>
       <Link href ="/RegisterPage2" underline="none">
       <ListItemText primary="License Request" />
       </Link>
       </ListItemButton>
       <ListItemButton>
       <ListItemIcon>
        <BarChartIcon/>
       </ListItemIcon>
       <Link href ="/Licensegenerator" underline="none">
       <ListItemText primary="License Generator"/>
       </Link>
       </ListItemButton>
        </List>
    </>
    )

}

export default SidebarMenu;
