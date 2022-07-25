import React from 'react';

//import Sidebar from "./layouts/sidebar/Index"
import Header from "./layouts/header/Index"
import Footer from "./component/footer/Index"
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';

//FirstPage
import DashboardContent from './content/dashboard/Dashboard';

//LicenseSite
import License from './content/datatable/licenselist/License';


import LicenseRequest from './content/datatable/licenserequestlist/LicenseRequestList';

//Generate Form
import Spareform from './content/license_generator/Spare';



 
 const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<DashboardContent/>} />
          <Route path = "/Messenger" element={<License/>}/>
          <Route path = "/Contact" element={<License/>}/>
          <Route path = "/LicenseList" element={<License/>}/>
          <Route path = "/LicenseRequest" element={<LicenseRequest/>}/>
          {/* <Route path = "/RegisterPage2" element={<RegisterPage2/>}/> */}
          <Route path = "/Licensegenerator" element={<Spareform/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default  App;