import { FC } from 'react';
import { Select, SelectProps } from '@mui/material';
import { useFormContext,Controller } from "react-hook-form";
import { styled } from '@mui/material/styles';


// 👇 Styled Material UI Select Component
const CssSelect = styled(Select)({
    '& label.Mui-focused': {
        color: '#5e5b5d',
        fontWeight: 400,
    },
    '& .MuiInputBase-input': {
        borderColor: '#c8d0d4',
    },
    '& .MuiOutlinedInput-after': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-error':{
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor: '#d32f2f',
            },
        },
        '& fieldset': {
            borderColor: '#c8d0d4',
            borderRadius: 0,
        },
        '&:hover fieldset':{
            border: '1px solid #c8d0d4',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #c8d0d4',
    },
},

});

type FormSelectProps = {
    name: string;
  } & SelectProps;

const LicenseTypeSelect: FC<FormSelectProps> = ({ name, ...otherProps }) => {
    // 👇 Utilizing useFormContext to have access to the form Context
    const {
      control,
      formState: { errors },
    } = useFormContext();
  
    return (
      <Controller
        control={control}
        name={name}
        defaultValue=''
        render={({ field }) => (
          <CssSelect
            {...field}
            {...otherProps}
            variant='outlined'
            sx={{ mb: '1.5rem' }}
            error={!!errors[name] ? errors[name].message : ''}
          />
        )}
      />
    );
  };

export default LicenseTypeSelect;
