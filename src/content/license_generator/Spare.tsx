import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Grid, FormLabel, FormHelperText, Box, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, 
  string, 
  TypeOf,
  //number,
  z
} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//import { useMutation } from '@tanstack/react-query';
import InputLabel from '@mui/material/InputLabel';





import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import isISODate from "is-iso-date";






const API = "http://192.168.10.170:3000/v1/api/slg";


// // Generate Order Data
// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault();
// }



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
  // function getType(name: string, TypeChoose: string[], theme: Theme) {
  //   return {
  //     fontWeight:
  //       TypeChoose.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  // const StorageSchema = object({
  //   label: string(),
  //   value: string(),
  //  });

  //  type StorageSelect = TypeOf<typeof StorageSchema>; 

  // Storage Data
  
  

 

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
  // function getStorage(name: string, StorageChoose: string[], theme: Theme) {
  //   return {
  //     fontWeight:
  //     StorageChoose.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }
  
  const generateSchema = object({
    certificate_no: string()
    .nonempty('required to generate'),
    customer_id: string().nonempty('required to generate'),
    end_customer_id: string().nonempty('required to generate'),
    type: z.enum(['SLG','LA']),
    activate: string().nonempty('required to generate'),
    serial_type: string().nonempty('required to generate'),
    storage: z.enum(['20GB','50GB','100GB','200GB','500GB','1TB','2TB','5TB','UNLIMITED']),
    expired: z.string().nonempty('required to generate'),
    //expired: z.preprocess((a) => new Date(z.string().parse(a)), z.date()),
    dashboard: string().nonempty('required to generate'),
    visualization: string().nonempty('required to generate'),
    multi_tenant: z.enum(['true', 'false'])
});


 export type GenerateInput = TypeOf<typeof generateSchema>;


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
//   multi: []};






  // Storage Part

  

const GeneratePage = () => {
  // const theme = useTheme();
  

  
  //const theme = useTheme();

  const [certificate_no, setCertificate_no]=  React.useState('')

  const CertificatehandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCertificate_no(event.target.value);
  }

  const [customer_id, setCustomer_id] =  React.useState('')

  const CustomerhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer_id(event.target.value);
  }

  const [end_customer_id, setEnd_Customer_id] =  React.useState('')

  const EndCustomerhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd_Customer_id(event.target.value);
  }


  const [activate,setActivate] = React.useState('')
  const ActivatehandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivate(event.target.value);
  }


  const [serial_type,setSerial_Type] = React.useState('')

  const SerialhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSerial_Type(event.target.value);
  }

 // const dashboard = React.useState('')

  const [Type, setType] = React.useState('');
  

  const TypehandleChange = (event: SelectChangeEvent<typeof Type>) => {
    setType(event.target.value as string);
      // On autofill we get a stringified value.
      

  };

  const [dashboard, setDashboard] = React.useState(0)
  const DashboardhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDashboard(event.target.valueAsNumber);
      // On autofill we get a stringified value.
      

  };

  

  const [visualization, setVisualization] = React.useState(0)
  const VisualizationhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisualization(event.target.valueAsNumber);
      // On autofill we get a stringified value.
      

  };

  const [expired, setExpired] = React.useState<Date | null>(
    //new Date("YYYY-MM-DDTHH:MM:SSZ"),
    new Date(),

  );
  const ExpirehandleChange = (newValue: Date | null) => {
    setExpired(newValue);
  };

  const [Storage, setStorage] = React.useState('');

  const StoragehandleChange = (event: SelectChangeEvent<typeof Storage>) => {
    setStorage(event.target.value as string);
      // On autofill we get a stringified value.
  
  };


    const[multi, setmulti] = React.useState<boolean>();
    const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(''); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setmulti(event.target.checked);
      setHelperText('Require to generate')
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

    
    const onSubmitHandler: SubmitHandler<GenerateInput> = async() => {
      
      // const data = {
      //   certificate_no: "",
      //   customer_id: "",
      //   end_customer_id:"",
      //   activate: "",
      //   serial_type: "",
      //   type:[],
      //   dashboard: "",
      //   visualization: "",
      //   storage: [],
      //   expired: "",
      //   multi: []
      // };
      //GenerateInput.preventDefault();
        await axios.post(API,{certificate_no:certificate_no,
                                        customer_id:customer_id,
                                        end_customer_id:end_customer_id,
                                        type:Type,
                                        activate:activate,
                                        serial_type:serial_type,
                                        storage:Storage,
                                        expired:expired,
                                        dashboard:dashboard,
                                        visualization:visualization,
                                        multi_tenant:multi
                                        })
        //axios.post(API,generate)
         .then(res =>{
             console.log(JSON.stringify(res,null,2));
             alert('success');
      }) 
      //console.log(JSON.stringify(,null,2))
    }
    console.log(errors);    

    // const onSubmitHandler: SubmitHandler<GenerateInput> = async(data) => {
    //    //e.preventDefault();
    //     await axios.post(API,{data})
    //     //axios.post(API,generate)
    //      .then(res =>{
    //          console.log(JSON.stringify(res,null,2));
    //          console.log(res.data);
    //   }) 
    //   console.log()
    // }
    // console.log(errors);

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
               {...register('certificate_no')}
                id = 'certificate_no'
                required
                fullWidth
                label='Certificate No' 
                sx={{ mb: 2 }}
                onChange = {CertificatehandleChange}
                error={!!errors['certificate_no']}
                 helperText={errors['certificate_no'] ? errors['certificate_no'].message : ''}
          
                />
              
              <TextField
                {...register('customer_id')}
                 required
                 fullWidth
                 label='Customer ID'
                 sx={{ mb: 2 }}
                 onChange = {CustomerhandleChange}
                 error={!!errors['customer_id']}
                 helperText={errors['customer_id'] ? errors['customer_id'].message : ''}
                 
                 />
              
              <TextField
                {...register('end_customer_id')}
                 required
                 fullWidth
                 label='End Customer ID'
                 sx={{ mb: 2 }}
                 onChange = {EndCustomerhandleChange}
                 error={!!errors['end_customer_id']}
                 helperText={errors['end_customer_id'] ? errors['end_customer_id'].message : ''}
                 
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
                    
                  >
                    {name}
            </MenuItem>
            ))}
          </Select>
        </FormControl>
              
              <TextField
                 {...register('activate')}
                 required
                 fullWidth
                 label='Activate'
                 sx={{ mb: 2 }}
                 onChange = {ActivatehandleChange}
                 error={!!errors['activate']}
                 helperText={errors['activate'] ? errors['activate'].message : ''}
                 
                 />
                 

              <TextField
                 {...register('serial_type')}
                 required
                 fullWidth
                 label='Serial Type'
                 sx={{ mb: 2 }}
                 onChange = {SerialhandleChange}
                 error={!!errors['serial_type']}
                 helperText={errors['serial_type'] ? errors['serial_type'].message : ''}
                 
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
                  >
                    {name}
            </MenuItem>
            ))}
          </Select>
          
        </FormControl>


        <FormControl sx={{ mb: 2, width: 300 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack component="form" noValidate spacing={3}>
        <DateTimePicker
          {...register("expired")}
          onChange={ExpirehandleChange}
          value = {expired}
          disablePast
          label="Expired Date"
          minDate={new Date()}
          ampm = {false}
           inputFormat = 'yyyy-MM-dd HH:mm:ss'
          renderInput={(params) => 
          <TextField {...params} 
          error={!!errors['expired']}
          helperText={errors['expired'] ? errors['expired'].message : ''}
          />}
          //helperText={errors['expired'] ? errors['expired'].message : ''}
          //error={!!errors['expired']}   
        /> 
          </Stack>
          </LocalizationProvider>
          </FormControl>  

          <FormControl sx={{ mb: 2, width: 300}}>
              <TextField
              {...register('dashboard')}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                required
                fullWidth
                label='Dashboard'
                type="number"
                sx={{ mb: 1 }}
                onChange = {DashboardhandleChange}
                error={!!errors['dashboard']}
                 helperText={errors['dashboard'] ? errors['dashboard'].message : ''}
                
                />
               
                <TextField
                {...register('visualization')}
                required
                fullWidth
                label='Visualization'
                type="number"
                sx={{ mb: 2 }}
                onChange = {VisualizationhandleChange}
                error={!!errors['visualization']}
                 helperText={errors['visualization'] ? errors['visualization'].message : ''}
                 
                />
                </FormControl>
                
                <FormControl sx={{ m: 1}} error={error} variant="standard">
                <FormLabel id="demo-error-radios">Multi Tenant</FormLabel>
                <RadioGroup
                row
                value = {multi}
                aria-labelledby="demo-error-radios"
                {...register('multi_tenant')}
                onChange={handleChange}
                >
                <FormControlLabel
                {...register("multi_tenant", { required: true })}
                value="true"
                control={<Radio />}
                label="True"
                />
                <FormControlLabel 
                {...register("multi_tenant", { required: true })}
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

