
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Title from '../../Title';

type LicenseList = {
  id: string,
  create_by_id: string,
  customer_id: string,
  end_customer_id: string,
  certificate_no: string,
  serial_data: SerialData,
  created_at: string,
};



type SerialData = {
  type: string,
  activate: string,
  serial_type: string,
  storage: number,
  expired: string,
  dashboard: number,
  visualization: number,
  multi_tenant: boolean,
};

async function getSLG(): Promise<LicenseList[]> {
  // try {
  const url = "http://192.168.10.170:3000/v1/api/slg";
  const response = await axios.get(url);
  return response.data;
  // } catch (err) {
  //   console.log(err);
  //   return [];
  // }
}


export default function Deposits() {
  const [licenses, setLicenses] = useState<[] | LicenseList[]>([]);
  const [SLG, setSLG] = React.useState<number>(0);
  
  const getAllSLG = async() => {
    const SLG = await getSLG();
    //setSLG(SLG); 
  }


  useEffect(() => {
    (async () => {
      const licenses = await getSLG();
      console.log(licenses)
      setLicenses(licenses);
    })();
  }, []);
  return (
    <React.Fragment>
      <Title>Type SLG</Title>
      <Typography component="p" variant="h4">
        5 License
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        just minute
      </Typography>
    </React.Fragment>
  );
}