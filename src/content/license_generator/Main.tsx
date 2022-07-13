import * as React from 'react';
import axios from 'axios';
import { Container, Grid, Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import RequestInput from '../../component/requestinput/RequestInput';
import Checkbox from '@mui/material/Checkbox';



const generateSchema = object({
certificate_no:string().nonempty('required ID'),
customer_id: string().nonempty('required Customer ID'),
end_customer_id: string().nonempty('required End Customer ID'),
activate: string().nonempty('required Activate'),
serial_type: string().nonempty('Serial is required'),
storage: string().nonempty('Required Storage'),
expired: string().nonempty('required Expired'),
type: string().nonempty('Type is required'),
visualization: string().nonempty('Visualization is required'),
multi_tenant: string(),
})


type IGenerate = TypeOf<typeof generateSchema>;

const GenerateForm: FC = () => {
  // 👇 Default Values
  const defaultValues: IGenerate = {
      certificate_no:'',
      customer_id: '',
      end_customer_id: '',
      activate: '',
      serial_type:'' ,
      storage: '',
      type:'',
      visualization:'',
      multi_tenant:'',

  };

 
  const API = "http://192.168.10.170:3000/v1/api/slg";

  const methods = useForm<IGenerate>({
    resolver:zodResolver(generateSchema),
    defaultValues,
  });


  const [type, setType] = React.useState('');
  const [storage, setStorage] = React.useState('');

  
  const onSubmitHandler: SubmitHandler<IGenerate> = (values: IGenerate) => {

   const resp = axios.post(API, {
      "certificate_no": "LG-LOGGERMA2001566781",
      "customer_id": "62a6b373dc6c82fe73b3b443",
      "end_customer_id": "62a6b373dc6c82fe73b3b443",
      "type": "SLG",
      "activate": "0ad0efd38471ac847f80806184905d58b261614e93a2d21fa207f0240579e36a",
      "serial_type": "new",
      "storage": "1GB",
      "expired": "2023-12-18 11:09:21",
      "dashboard": 2,
      "visualization": 1, 
      "multi_tenant": false
    })
    .then(resp => {
      console.log(resp);
      console.log(resp.data);
    })
    console.log(resp);
  };


  
const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    setStorage(event.target.value as string);
  };
  return (
      <Container
        maxWidth={false}
        sx={{ height: '100', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ width: '100%', height: '100%' }}
        >
          <Grid
            item
            sx={{ maxWidth: '100rem', width: '100%',backgroundColor: '#fff' }}
          >
            <Grid
              container
              sx={{
                boxShadow: { sm: '0 0 5px #ddd' },
                py: '6rem',
                px: '1rem',
              }}
            >
              <FormProvider {...methods}>
                <Typography
                  variant='h4'
                  component='h1'
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    mb: '1.5rem',
                    pb: { sm: '3rem' },
                  }}
                >
                  Welcome To License Generate
                </Typography>
                <Grid
                  item
                  container
                  justifyContent='center'
                  rowSpacing={5}
                  sx={{
                    maxWidth: { sm: '45rem' },
                    marginInline: 'auto',
                  }}
                >
                    <Box
                      display='flex'
                      flexDirection='column'
                      component='form'
                      noValidate
                      autoComplete='off'
                      onSubmit={methods.handleSubmit(onSubmitHandler)}
                    >
                      
                      <RequestInput
                        label='Certificate no'
                        type='text'
                        name='certificate_no'
                        focused
                      />
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                           }}
                          noValidate
                          autoComplete="off">
                          
                      <RequestInput
                        label='Customer ID'
                        type='text'
                        name='customer_id'
                        focused
                        required
                      />
                      <RequestInput
                        label='End Customer ID'
                        type='text'
                        name='end_customer_id'
                        focused
                        required
                      />
                      
                      </Box>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                           }}
                          noValidate
                          autoComplete="off">
                       <RequestInput
                        label='Serial Type'
                        type='text'
                        name='serial_type'
                        focused
                        required
                      />
                     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">Storage</InputLabel>
                      <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={storage}
                          label="Storage"
                         onChange={handleChange}
                      >
                      <MenuItem value={20}>20 GB</MenuItem>
                      <MenuItem value={50}>50 GB</MenuItem>
                      <MenuItem value={100}>100 GB</MenuItem>
                      <MenuItem value={500}>500 GB</MenuItem>
                      <MenuItem value={1000}>1 TB</MenuItem>
                      <MenuItem value={2000}>2 TB</MenuItem>
                      <MenuItem value={3000}>3 TB</MenuItem>
                      <MenuItem value={4000}>Unlimited</MenuItem>
                        </Select>
                        </FormControl>
                      </Box>
                      
                      
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack component="form" noValidate spacing={3}>
                      <TextField
                       id="datetime-local"
                       label="Next appointment"
                          type="datetime-local"
                       defaultValue="2017-05-24T10:30"
                      sx={{ width: 250 }}
                      InputLabelProps={{
                      shrink: true,
                      }}
                      />
                    </Stack>
                    <RequestInput
                        type='integer'
                        label='Dashboard'
                        name='dashobard'
                        required
                        focused
                      />
                    </LocalizationProvider>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '25ch' },
                           }}
                          noValidate
                          autoComplete="off">
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={type}
                          label="Type"
                         onChange={handleChange}
                      >
                      <MenuItem value={20}>SLG</MenuItem>
                      <MenuItem value={50} >LA</MenuItem>
                        </Select>
                        </FormControl>
                      <RequestInput
                        type='integer'
                        label='Visualization'
                        name='visualization'
                        required
                        focused
                      />
                      </Box>
                      <Grid item xs={12}>
                      <FormControlLabel
                       control={<Checkbox value="multi_tenant" color="primary" />}
                        label="If you select this it will set True"
                      />
                    </Grid>
                      <LoadingButton
                        loading={false}
                        type='submit'
                        variant='contained'
                        sx={{
                          py: '0.8rem',
                          mt: 2,
                          width: '80%',
                          marginInline: 'auto',
                        }}
                      >
                        Generate
                      </LoadingButton>
                      </Box>
                  
                </Grid>
              </FormProvider>
            </Grid>
          </Grid>
        </Grid>
      </Container>
  );
};
export default GenerateForm;
