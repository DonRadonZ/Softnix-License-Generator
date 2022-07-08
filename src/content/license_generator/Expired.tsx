import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';

export default function Expired() {
  return (
    <FormControl sx={{ mb: 2, width: 300 }}>
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="datetime-local"
        label="Expired Date"
        type="datetime-local"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
    </FormControl>
  );
}
