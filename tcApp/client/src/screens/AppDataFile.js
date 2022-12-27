
import axios from "axios";

import { APIListHealthInsurances,APIGetAgencyJobs,APIListHealthHospitals } from "./DataFileApis";

export const HealthInsuranceData=[];export const HealthHospitalsData=[];
export const AgencyJobsData=[];


export const LoadAgencyData = () =>
{
    getAppData(APIGetAgencyJobs,AgencyJobsData)
}
export const LoadTcHealthAppData = () =>
{
    getAppData(APIListHealthInsurances,HealthInsuranceData)
    getAppData(APIListHealthHospitals,HealthHospitalsData)
}


const  getAppData = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        StateName.push(jsonResults)
        })
    .catch(err=>{console.log(err);})
}