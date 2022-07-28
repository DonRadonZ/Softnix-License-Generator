import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
//import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
//import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
//import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
//import Link from '@mui/material/Link';
import Slg from './View_SLG';
import Request from './Request';
import License from './Licenselist';
import Typela from './Typela';
import Summary from './Summary';



const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex' }}>
            <Grid container spacing={3} my={3} mx={37}>
              {/* View_SLG */}
              <Grid item  >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: 300
                  }}
                >
                  {/* Type LA */}
                  <Slg/>
                </Paper>
              </Grid>
              {/* View_LA */}
              <Grid item  >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: 300
                  }}
                >
                  <Typela/>
                </Paper>
                {/* Overview */}
              </Grid>
              {/* View_Request */}
              <Grid item 
              //xs={12} 
              //md={4} 
              //lg={3} 
              >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: 300
                  }}
                >
                  <Request />
                </Paper>
              </Grid>
              {/* View_Summary */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: 300
                  }}
                >
                  <Summary />
                </Paper>
              </Grid>
              {/* License List */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', width:1270 }}>
                  <License />
                </Paper>
              </Grid>
            </Grid>
        </Box>
    </ThemeProvider>
  );
}

export default  DashboardContent;
