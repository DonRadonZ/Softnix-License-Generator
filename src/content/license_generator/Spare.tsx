import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Grid, FormGroup, FormHelperText, Box, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf, boolean, date, z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputLabel from '@mui/material/InputLabel';
import { FC } from 'react';

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

import RequestInput from '../../component/textinput/generate/GenerateTextInput';
// import LicenseTypeSelect from "../../component/textinput/generate/LicenseTypeSelect";
import GenerateNumberInput from "../../component/textinput/generate/GenerateNumberInput";



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
    '20 GB',
    '50 GB',
    '100 GB',
    '200 GB',
    '500 GB',
    '1 TB',
    '2 TB',
    '3 TB',
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
    storage: z.enum(["20GB","50GB","100GB","200GB","500GB","1TB","2TB","5TB","UNLIMITED"]),
    expired: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    multi: boolean( {
      invalid_type_error: 'required to generate',
    }),

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

  

const GeneratePage:FC = () => {
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


    const[value, setvalue] = React.useState('True');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setvalue(event.target.value);

     
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
        axios.post(API,generate)
        .then(res =>{
            console.log(generate);

        })
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
                  
              <RequestInput
                name='certificate_no'
                required
                fullWidth
                label='Certificate No' 
                sx={{ mb: 2 }}
                />
              
              <RequestInput
                 name='customer_id'
                 required
                 fullWidth
                 label='Customer ID'
                 sx={{ mb: 2 }}
                 />
              
              <RequestInput
                 name='end_customer_id'
                 required
                 fullWidth
                 label='End Customer ID'
                 sx={{ mb: 2 }}
                 />

        <FormControl sx={{ mb: 2, width: 300 }}>
        <InputLabel id="type">Type</InputLabel>
          <Select
          {...register("type", { required: true})}
            name = "type"
            required
            displayEmpty
            value={TypeChoose}
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

              <RequestInput
                 name='activate'
                 required
                 fullWidth
                 label='Activate'
                 sx={{ mb: 2 }}
                 />

              <RequestInput
                 name='serial_type'
                 required
                 fullWidth
                 label='Serial Type'
                 sx={{ mb: 2 }}
                 />
              

          <FormControl sx={{ mb: 2, width: 300 }}>
          <InputLabel id="storage">Storage</InputLabel>
          <Select
            {...register("storage", { required: true })}
            name = "storage"
            displayEmpty
            required
            value = {StorageChoose}
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
        <RequestInput
          id="expired"
          label="Expired Date"
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("expired", {required: true})}
        /> 
          </Stack>
          </FormControl>
              

              <GenerateNumberInput
                name='dashboard'
                required
                fullWidth
                label='Dashboard'
                sx={{ mb: 2 }}
                />

                <GenerateNumberInput
                name='visualization'
                required
                fullWidth
                label='Visualization'
                sx={{ mb: 2 }}
                />
                
              <FormGroup>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="multi"
                value={value}
                onChange={handleChange}
                >
                <FormControlLabel
                value="true"
                {...register("multi")}
                  control={<Radio required />}
                  label="True"
                />
                <FormControlLabel 
                value="false"
                {...register("multi")}
                  control={<Radio required />}
                  label= "False"
                />
             </RadioGroup>
             <FormHelperText error={!!errors['multi']}>
                  {errors['multi'] ? errors['multi'].message : ''}
                </FormHelperText>
              </FormGroup>
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

