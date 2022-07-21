import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Grid, FormLabel, FormHelperText, Box, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf, z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputLabel from '@mui/material/InputLabel';
//import { FC } from 'react';

import { Theme,useTheme } from '@mui/material/styles';


import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
//import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';







const API = "http://192.168.10.170:3000/v1/api/slg";




  //Type Select
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // const TypeSchema = object({
  //   label: string(),
  //   value: string(),
  //  });
// type TypeSelect = TypeOf<typeof TypeSchema>;
  

  const type = [
    'SLG',
    'LA'
  
  ];
  function getType(name: string, TypeChoose: string[], theme: Theme) {
    return {
      fontWeight:
        TypeChoose.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // const StorageSchema = object({
  //   label: string(),
  //   value: string(),
  //  });

  //  type StorageSelect = TypeOf<typeof StorageSchema>; 

  // Storage Data
  
  

  // const storageChoose:StorageSelect[] = [
  //   {label:"20 GB", value:"20 GB"},
  //   {label:"50 GB", value:"50 GB"},
  //   {label:"100 GB", value:"100 GB"},
  //   {label:"200 GB", value:"200 GB"},
  //   {label:"500 GB", value:"500 GB"},
  //   {label:"1 TB", value:"1 TB"},
  //   {label:"2 TB", value:"2 TB"},
  //   {label:"3 TB", value:"3 TB"},
  //   {label:"Unlimited", value:"Unlimited"}
 
  // ];

  const storage =  [
    '20GB',
    '50GB',
    '100GB',
    '200GB',
    '500GB',
    '1TB',
    '2TB',
    '3TB',
    'Unlimited'
  ];
  function getStorage(name: string, StorageChoose: string[], theme: Theme) {
    return {
      fontWeight:
      StorageChoose.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  const generateSchema = object({
    certificate_no: string()
    .nonempty('required to generate'),
    customer_id: string().nonempty('required to generate'),
    end_customer_id: string().nonempty('required to generate'),
    activate: string().nonempty('required to generate'),
    serial_type: string().nonempty('required to generate'),
    type: z.enum(["SLG","LA"]),
    dashboard: string().nonempty('required to generate'),
    visualization: string().nonempty('required to generate'),
    storage: z.enum(["20GB","50GB","100GB","200GB","500 GB","1TB","2TB","5TB","UNLIMITED"]),
    expired: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    multi: z.enum(['true', 'false'])

});


 type GenerateInput = TypeOf<typeof generateSchema>;


// const defaultValues: GenerateInput = {
//   certificate_no: "",
//   customer_id: "",
//   end_customer_id: "",
//   activate: "",
//   serial_type: "",
//   type: [],
//   dashboard: "",
//   visualization: "",
//   storage: [],
//   expired: new Date(),
//   multi: true};






  // Storage Part

  

const GeneratePage = () => {
  // const theme = useTheme();
  

  
  const theme = useTheme();


  const [TypeChoose, setTypeChoose] = React.useState<string[]>([]);


  const TypehandleChange = (event: SelectChangeEvent<typeof TypeChoose>) => {
    const {
      target: { value },
    } = event;
    setTypeChoose(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [timevalue, setTimevalue] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.00Z'),
  );

  const [StorageChoose, setStorageChoose] = React.useState<string[]>([]);

  const StoragehandleChange = (event: SelectChangeEvent<typeof StorageChoose>) => {
    const {
      target: { value },
    } = event;
    setStorageChoose(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


    const[value, setvalue] = React.useState('');
    const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setvalue((event.target as HTMLInputElement).value);
      setHelperText('Require to generate');
      setError(false);
    }
    
    // const controlProps = (item: string) => ({
    // checked: value === item,
    // onChange: handleChange,
    // value: item,
    // name: 'color-radio-button-demo',
    // inputProps: { 'aria-label': item },
    // });




   


    const methods = useForm<GenerateInput>({
        resolver: zodResolver(generateSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors},
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<GenerateInput> = (generate: GenerateInput ) => {
        // axios.post(API,generate)
        // .then(res =>{
             console.log(generate);

      //})
    }
    console.log(errors);

    // const handleReset = () => {
    //   reset(defaultValues);
    // };

    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{ width: '100%', height: '100%' }}
          >
          <Box 
          sx={{ maxWidth: '30rem'}}
          justify-content = 'center'>
              <Typography variant='h4' component='h1'  sx={{textAlign:'center', mb: '2rem'}}>
                  Generate Form
              </Typography>
             
          <FormProvider {...methods}>
              <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmitHandler)}
              >
                  
              <TextField
                required
                fullWidth
                label='Certificate No' 
                sx={{ mb: 2 }}
                error={!!errors['certificate_no']}
          helperText={errors['certificate_no'] ? errors['certificate_no'].message : ''}
          {...register('certificate_no')}
                />
              
              <TextField
                 required
                 fullWidth
                 label='Customer ID'
                 sx={{ mb: 2 }}
                 error={!!errors['customer_id']}
                 helperText={errors['customer_id'] ? errors['customer_id'].message : ''}
                 {...register('customer_id')}
                 />
              
              <TextField
                 required
                 fullWidth
                 label='End Customer ID'
                 sx={{ mb: 2 }}
                 error={!!errors['end_customer_id']}
                 helperText={errors['end_customer_id'] ? errors['end_customer_id'].message : ''}
                 {...register('end_customer_id')}
                 />

        <FormControl sx={{ mb: 2, width: 300 }}>
        <InputLabel id="type">Type</InputLabel>
          <Select
          {...register("type", { required: true})}
            name = "type"
            required
            displayEmpty
            input={<OutlinedInput label="Type"/>}
            MenuProps={MenuProps}
            onChange={TypehandleChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            
            {type.map((name) =>(
            <MenuItem key={name}
                      value={name}
                      style={getType(name,TypeChoose, theme)}
                  >
                    {name}
            </MenuItem>
            ))}
          </Select>
        </FormControl>

              <TextField
                 required
                 fullWidth
                 label='Activate'
                 sx={{ mb: 2 }}
                 error={!!errors['activate']}
                 helperText={errors['activate'] ? errors['activate'].message : ''}
                 {...register('activate')}
                 />

              <TextField
                 required
                 fullWidth
                 label='Serial Type'
                 sx={{ mb: 2 }}
                 error={!!errors['serial_type']}
                 helperText={errors['serial_type'] ? errors['serial_type'].message : ''}
                 {...register('serial_type')}
                 />
              

          <FormControl sx={{ mb: 2, width: 300 }}>
          <InputLabel id="storage">Storage</InputLabel>
          <Select
            {...register("storage", { required: true })}
            name = "storage"
            displayEmpty
            required
            input={<OutlinedInput label="Storage"/>}
            MenuProps={MenuProps}
            onChange={StoragehandleChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {storage.map((name) =>(
            <MenuItem key={name}
                      value={name}
                      style={getStorage(name,StorageChoose, theme)}
                  >
                    {name}
            </MenuItem>
            ))}
          </Select>
          
        </FormControl>



          <FormControl sx={{ mb: 2, width: 300 }}>
      <Stack component="form" noValidate spacing={3}>
        <TextField
          id="expired"
          //value = {timevalue}
          label="Expired Date"
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors['expired']}
                 helperText={errors['expired'] ? errors['expired'].message : ''}
          {...register("expired")}
        /> 
          </Stack>
          </FormControl>
              

              <TextField
                required
                fullWidth
                label='Dashboard'
                sx={{ mb: 2 }}
                error={!!errors['dashboard']}
                 helperText={errors['dashboard'] ? errors['dashboard'].message : ''}
                 {...register('dashboard')}
                />

                <TextField
                required
                fullWidth
                label='Visualization'
                sx={{ mb: 2 }}
                error={!!errors['visualization']}
                 helperText={errors['visualization'] ? errors['visualization'].message : ''}
                 {...register('visualization')}
                />
                
                <FormControl sx={{ m: 3 }} error={error} variant="standard">
                <FormLabel id="demo-error-radios">Multi Tenant</FormLabel>
                <RadioGroup
                row
                value = {value}
                aria-labelledby="demo-error-radios"
                {...register('multi')}
                onChange={handleChange}
                >
                <FormControlLabel
                {...register("multi", { required: true })}
                value="true"
                control={<Radio />}
                label="True"
                />
                <FormControlLabel 
                {...register("multi", { required: true })}
                value="false"
                control={<Radio/>}
                label= "False"
                />
             </RadioGroup>
             <FormHelperText >
                {helperText}
              </FormHelperText>
              </FormControl>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                sx={{ py: '0.8rem', mt: '1rem' }}
              >
                Generate
              </Button>
            </Box>
          </FormProvider>
      </Box>
      </Grid>
    );
  };

export default GeneratePage;

