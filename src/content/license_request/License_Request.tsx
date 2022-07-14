import * as React from 'react';
// import axios from 'axios';
import { Container, Grid, Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';



import RequestInput from '../../component/textinput/generate/GenerateTextInput';

const requestSchema = object({
company:string(),
firstname: string().nonempty('required first name'),
lastname: string().nonempty('required last name'),
tel: string().nonempty('required telephone number').max(10),
email: string().nonempty('Email is required').email('Email is invalid'),
address: string().nonempty('Required address').max(300),
type: string().nonempty('Type is required'),
amount: string().nonempty('Amount is required'),
message: string().max(300),
})


type IRequest = TypeOf<typeof requestSchema>;

const RequestForm: FC = () => {
  // 👇 Default Values
  const defaultValues: IRequest = {
      company:'',
      firstname: '',
      lastname: '',
      tel: '',
      email:'' ,
      address: '',
      type:'',
      amount:' ',
      message:'',

  };

  const methods = useForm<IRequest>({
    resolver:zodResolver(requestSchema),
    defaultValues,
  });
  const onSubmitHandler: SubmitHandler<IRequest> = (values: IRequest) => {
    console.log(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
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
                Welcome To Request Form
              </Typography>
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Request Form
                    </Typography>
                    
                    <RequestInput
                      label='Company'
                      type='text'
                      name='company'
                      focused
                    />
                    <div>
                    <RequestInput
                      label='First Name'
                      type='text'
                      name='firstname'
                      focused
                      required
                    />
                    <RequestInput
                      label='Last Name'
                      type='text'
                      name='lastname'
                      focused
                      required
                    />
                    </div>
                    <div>
                     <RequestInput
                      label='Telephone'
                      type='integer'
                      name='tel'
                      focused
                      required
                    />
                    <RequestInput
                      label='Enter your email'
                      type='email'
                      name='email'
                      focused
                      required
                    />
                    </div>
                    <RequestInput
                      type='address'
                      label='Address'
                      name='address'
                      required
                      focused
                    />
                    <div>
                    <RequestInput
                      type='type'
                      label='Type'
                      name='type'
                      required
                      focused
                    />
                    <RequestInput
                      type='Amount'
                      label='amount'
                      name='amount'
                      required
                      focused
                    />
                    </div>
                      <RequestInput
                      type='Text'
                      label='Message'
                      name='message'
                      focused
                    />
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
                      Submit
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default RequestForm;
