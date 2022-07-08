import axios from 'axios';

const URL = "http://192.168.10.170:3000/v1/api/slg";

class GenerateService {

    getLicense(){
        return axios.get(URL);
    }
    generateLicense(certificate_no:string, customer_id:string, end_customer_id:string, type:string, activate: string, serial_type: string, storage:string, expired: number, dashboard: number, 
        visualization: number, multi_tenant: boolean){
        return axios.post(URL,{  
            certificate_no,
            customer_id,
        end_customer_id,
        type,
        activate,
        serial_type,
        storage,
        expired,
        dashboard,
        visualization,
        multi_tenant});
    }
}

export default GenerateService;