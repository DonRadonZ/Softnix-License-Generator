import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
import Title from './Title';


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

async function getLicenses(): Promise<LicenseList[]> {
  // try {
  const url = "http://192.168.10.170:3000/v1/api/slg";
  const response = await axios.get<LicenseList[]>(url);
  return response.data;
  // } catch (err) {
  //   console.log(err);
  //   return [];
  // }
}
// Generate Order Data
function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  const [licenses, setLicenses] = useState<[] | LicenseList[]>([]);
  const [page]  = React.useState(0);
  const [rowsPerPage] = React.useState(5);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  useEffect(() => {
    (async () => {
      const licenses = await getLicenses();
      console.log(licenses)
      setLicenses(licenses);
    })();
  }, []);
 
  return (
    <React.Fragment>
      <Title>License List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Certificate ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Storage</TableCell>
            <TableCell>Expired</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licenses
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((license) => (
            <TableRow key={license.id}>
              <TableCell>{license.customer_id}</TableCell>
              <TableCell>{license.certificate_no}</TableCell>
              <TableCell>{license.serial_data.type}</TableCell>
              <TableCell>{license.serial_data.storage}</TableCell>
              <TableCell>{license.serial_data.expired}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={licenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Link color="primary" href="/License" onClick={preventDefault} sx={{ mt: 3 }}>
        See more License
      </Link>
    </React.Fragment>
  );
}

