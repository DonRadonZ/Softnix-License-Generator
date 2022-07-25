import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Title from '../Title';


type RequestList = {
  company: string,
  firstname: string,
  lastname: string,
  tel: string,
  email: string,
  address: string,
  Type: string,
  amount: number,
  message: string,
  interaction:boolean,
};




async function getRequest(): Promise<RequestList[]> {
  // try {
  const url = "http://192.168.10.170:3000/v1/api/slg";
  const response = await axios.get<RequestList[]>(url);
  return response.data;
  // } catch (err) {
  //   console.log(err);
  //   return [];
  // }
}
// // Generate Order Data
// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault();
// }

export default function License() {
  const [request, setRequest] = useState<[] | RequestList[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    (async () => {
      const request = await getRequest();
      console.log(request);
      setRequest(request);
    })();
  }, []);

  
 
  return (
    <React.Fragment>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Title>License Request List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            {/* <TableCell>First Name</TableCell> */}
            {/* <TableCell>Last Name</TableCell> */}
            <TableCell>Tel.</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Dashboard</TableCell>
            <TableCell>Visualization</TableCell>
            <TableCell>Interaction</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {licenses
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((license) => (
            // <TableRow key={license.id} tabIndex={-1}>
            //   <TableCell>{license.customer_id}</TableCell>
            //   <TableCell>{license.certificate_no}</TableCell>
            //   <TableCell>{license.serial_data.type}</TableCell>
            //   <TableCell>{license.serial_data.storage}</TableCell>
            //   <TableCell>{license.serial_data.expired}</TableCell>
            //   <TableCell>{license.serial_data.expired}</TableCell>
            //   <TableCell>{license.serial_data.expired}</TableCell>
            //   <TableCell>{license.serial_data.expired}</TableCell>
            //   <TableCell>{license.serial_data.expired}</TableCell>
            // </TableRow>
          ))}
        </TableBody> */}
      </Table>
      <TableContainer/>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={request.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </React.Fragment>
  );
}

