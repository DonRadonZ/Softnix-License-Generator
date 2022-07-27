import axios from 'axios';
import { GenerateInput } from './../content/license_generator/Spare';
import { GenericResponse } from './types';
const API = "http://192.168.10.170:3000/v1/api/slg";


export const GenerateFn = async(generate:GenerateInput) => {
    const response = await axios.post<GenericResponse>(API, generate);
    return response.data;
}