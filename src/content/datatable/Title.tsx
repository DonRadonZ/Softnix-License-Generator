import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography align="center" component="h2" variant="h6" color="primary" gutterBottom sx={{my: 3}}>
      {props.children}
    </Typography>
  );
}