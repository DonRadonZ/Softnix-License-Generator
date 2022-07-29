import * as React from 'react';

import Typography from '@mui/material/Typography';
import Title from '../../Title';





export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Summary</Title>
      <Typography component="p">
        Active           3 License
      </Typography>
      <Typography component="p">
        Nearly Expire    1 License
      </Typography>
      <Typography component="p">
        Expired           2 License
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>

    </React.Fragment>
  );
}