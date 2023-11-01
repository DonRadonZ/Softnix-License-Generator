import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';





export default function Deposits() {
  return (
    <React.Fragment>
      <Title>License Request</Title>
      <Typography component="p" variant="h4">
        7 License
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2022
      </Typography>

    </React.Fragment>
  );
}