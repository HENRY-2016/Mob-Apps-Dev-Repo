
import axios from "axios";

import { APIListHealthInsurances,APIGetAgencyJobs,APIListHealthHospitals } from "./DataFileApis";

export const HealthInsuranceData=[];export const HealthHospitalsData=[];
export const AgencyJobsData=[];


export const LoadAgencyData = () =>
{
    getAppData(APIGetAgencyJobs,AgencyJobsData)
}
// export const LoadTcHealthAppData = () =>
// {
//     getAppData(APIListHealthInsurances,HealthInsuranceData)
//     getAppData(APIListHealthHospitals,HealthHospitalsData)
// }


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


export const HolidayHomes = [
    {House:"UG Zana House"},
    {House:"UG Buddo House"},
    {House:"UG Ndejje House"},
    {House:"UG Magere House"},
    {House:"UG Busega House"},
    {House:"UK Sutton House"},

]

export const DateYearsNames = [{"Year":"2023"}, {"Year":"2024"}, {"Year":"2025"}, {"Year":"2026"}];


export const HealthBenefits = [
        
        {key:": 1. Reimbursement",value:":  90%"},
        {key:": 2. Evacuation",value:":  Covered"},
        {key:": 3. Day Surgery",value:":  Covered"},
        {key:": 4. Last expense",value:":  Covered"},
        {key:": 5. Bed Type",value:":  As indicated in the schedule"},
        {key:": 6. Age Eligibility",value:":  Adults:18 Yrs to 65 Yrs"},
        {key:": 7. Inpatient dental & Optical Accidents",value:":  Covered"},
        {key:": 8. Maternity Cover",value:":  As indicated in the schedule"},
        {key:": 9. Congenital Conditions",value:":  As indicated in the schedule"},
        {key:": 10. Reconstructive surgery following an accident",value:":  Covered"},
        {key:": 11. CT, MRI and PET scans – subject to prescription",value:":  Covered"},
        {key:": 12. Psychiatric Conditions",value:":  Covered up to 20% of the IP limit"},
        {key:": 13. Inpatient Dental & Optical Illness",value:":  As indicated in the schedule"},
        {key:": 14. Main Plans Covered",value:":  Inpatient, Outpatient, Dental & Optical, Maternity"},
        {key:": 15. Maternity Cover",value:":  Deliveries: Covered within the inpatient limit as indicated in the schedule"},
        {key:": 16. Pre-existing, Chronic & HIV Conditions",value:":  Covered within the inpatient limit as indicated in the schedule"},
        {key:": 17. Accommodation costs for 1 parent (Lodger Fee) staying in hospital with insured child under 6 years",value:":  Covered"},
    ]

export const HealthAInPatientCover = [
        {key:": 1. Day care surgery",value:":  Covered"},
        {key:": 2. Inpatient Physiotherapy",value:":  Covered"},
        {key:": 3. ICU, IDU hospitalization",value:":  Covered"},
        {key:": 4. Operation Theatre charges",value:":  Covered"},
        {key:": 5. Oncology/Cancer treatment",value:":  Covered"},
        {key:": 6. Emergency road ambulance",value:":  Covered"},
        {key:": 7. Psychiatry and psychotherapy",value:":  Covered"},
        {key:": 8. Radiotherapy and Chemotherapy",value:":  Covered"},
        {key:": 9. Overall Annual Limit Per Person",value:":  Covered"},
        {key:": 10. Hospital accommodation Per Night",value:":  Covered"},
        {key:": 11. Treatment of fibroids and cysts",value:":  Covered"},
        {key:": 12. Congenital and Hereditary Conditions",value:":  Covered"},
        {key:": 13. Inpatient dental & Optical treatment",value:":  Covered"},
        {key:": 14. Scans (ECG, CT, MRI and PET and other scans)",value:":  Covered"},
        {key:": 15. Physician’s, Surgeon’s, Consultant’s & Anesthetist’s fees",value:":  Covered"},
        {key:": 16. Lodger fees for adults accompanying a child below 8 years.",value:":  Covered"},
        {key:": 17. Inpatient gynecological surgery excluding fertility treatment",value:":  Covered"},
        {key:": 18. Cost of prescribed medicines and dressings, surgical appliances",value:":  Covered"},
        {key:": 19. Pre-existing and chronic conditions including cancer and HIV/AIDS",value:":  Covered"},
        {key:": 20. Reconstructive surgery following an accident excluding cosmetic surgery",value:":  Covered"},
        {key:": 21. Cost of X-rays, diagnostic examination, investigations and laboratory tests",value:":  Covered"},
        {key:": 22. Hearing aids where necessitated by an accident or an insured illness or disease",value:":  Covered"},
        {key:": 23. Internal & external prosthesis and appliances excluding dental prosthesis or appliances",value:":  Covered"},
        {key:": 24 Local (within Uganda) Emergency Evacuation for transportation of a sick Member for treatment from an area where facilities for adequate care do not exist to the next available hospital or licensed medical facility",value:":  Covered"},
    ]

export const HealthBOutPatientCover = [
        {key:": 1. Outpatient Surgery",value:":  Covered"},
        {key:": 2. Outpatient Physiotherapy",value:":  Covered"},
        {key:": 3. Psychiatry & psychotherapy",value:":  Covered"},
        {key:": 4. Radiotherapy and Chemotherapy",value:":  Covered"},
        {key:": 5. Overall Annual Limit Per Person",value:":  Covered"},
        {key:": 6. Counseling Services, upon referral",value:":  Covered"},
        {key:": 7. Outpatient oncology/cancer treatment",value:":  Covered"},
        {key:": 8. Scans (ECGs, CT, MRI and PET Scans )",value:":  Covered"},
        {key:": 9. Congenital and Hereditary Conditions",value:":  Covered"},
        {key:": 10. Family Planning Advice and Procedures",value:":  Covered"},
        {key:": 11. Cost of hiring clutches or wheelchair",value:":  Covered"},
        {key:": 12. Gynecological and obstetrics treatment",value:":  Covered"},
        {key:": 13. Oncology including cancer tests (Pap smear and prostate)",value:":  Covered"},
        {key:": 14. Physician’s, Surgeon’s, Consultant’s & Anesthetist’s fees",value:":  Covered"},
        {key:": 15. Cost of prescribed medicines, surgical appliances, dressings",value:":  Covered"},
        {key:": 16. Ante-natal and post-natal care and up to 2 ultra sound scans.",value:":  Covered"},
        {key:": 17. Prescribed Laboratory Tests and approved X-rays,& other Diagnostic Tests and Procedures",value:":  Covered"},
    ]

export const HealthCDentalCover = [
        {key:": 1. X-rays",value:":  Covered"},
        {key:": 2. Scaling",value:":  Covered"},
        {key:": 3. Fillings",value:":  Covered"},
        {key:": 4. Root canal",value:":  Covered"},
        {key:": 5. Anesthetists fees",value:":  Covered"},
        {key:": 6. Simple or surgical extractions",value:":  Covered"},
        {key:": 7. Overall Annual Limit Per Person",value:":  Covered"},
    ]

export const HealthOpticalCover = [
        {key:": 1. Eye testing",value:":  Covered"},
        {key:": 2. Eye lenses & glasses",value:":  Covered"},
        {key:": 3. Overall Annual Limit Per Person",value:":  Covered"},
        {key:": 4. Treatment of eye and eye related illnesses",value:":  Covered"},
    ]

export const HealthMaternityCover = [
        {key:": 1. Normal or Caesarian section delivery including complications of maternity/pregnancy covered within inpatient limit",value:":  Covered"},
    ]
export const HealthFuneralExpenses =[
        {key:": 1. Payable on confirmation of death of a covered member within the period of insurance",value:":  Covered"},
    ]


export const HealthPeadiatrics = [

        {LOCATION:": Kyaliwajala",PROVIDER:" : Life Link Hospital" ,ADDRESS:" : Namugongo" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Nsambya",PROVIDER:" : St.Francis Hospital Nsambya" ,ADDRESS:" : Nsambya" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Mengo",PROVIDER:" : Mengo Hospital" ,ADDRESS:" : Mengo Hospital Complex" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Najjera",PROVIDER:" : Najjera Hospital" ,ADDRESS:" : Plot 726, Kiwatule" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Mulago",PROVIDER:" : Heart Institute Mulago" ,ADDRESS:" : Mulago Hospital Cplx" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Mulago",PROVIDER:" : Cancer Institute Mulago" ,ADDRESS:" : Mulago Hospital Cplx" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Bukoto",PROVIDER:" : UMC Victoria Hospital" ,ADDRESS:" : Plot 86 Bukoto Kampala" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Buganda Rd",PROVIDER:" : St Catherine's Clinic" ,ADDRESS:" : Plot 83 Buganda Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Buganda Rd",PROVIDER:" : Case Medical Center" ,ADDRESS:" : Plot 69/71 Buganda Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : Doctor's Hospital Sseguku" ,ADDRESS:" : Entebbe Sseguku" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Buganda Rd",PROVIDER:" : Platinum Medical Center" ,ADDRESS:" : Plot 83 Buganda Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Lugogo Bypass",PROVIDER:" : Ruby Medical Center" ,ADDRESS:" : Plot 0 Lugogo Bypass" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Kololo",PROVIDER:" : Kampala Hospital Ltd" ,ADDRESS:" : Plot 6 Makindu CLose, Kololo" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Bugolobi",PROVIDER:" : Bugolobi Medical Center" ,ADDRESS:" : Plot 134 Spring Rd Bugolobi" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Bombo Rd",PROVIDER:" : Norvik Hospital & Research Centre Ltd" ,ADDRESS:" : Plot 13, Bombo Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7"},
        {LOCATION:": Namuwongo",PROVIDER:" : International Hospital Kampala" ,ADDRESS:" : Plot 4686 - Kisugu Namuwongo" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Kololo",PROVIDER:" : Medipal International Healthcare" ,ADDRESS:" : Plot 1A Lower Kololo Terrace" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Bombo Rd",PROVIDER:" : Savannah Sunrise Medical Center (SAS Clinic)" ,ADDRESS:" : Shoal House Bombo Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Nakasero",PROVIDER:" : The Medical Hub (Roswell Women & Children’s Hospital)" ,ADDRESS:" : Plot 35 Yusuf Lule Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
    ]

export const HealthGeneralPractitioners = [
        {LOCATION:": Nateete",PROVIDER:" : AAR Nateete" ,ADDRESS:" : Nateete" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Nansana",PROVIDER:" : Sebbi Medical Center" ,ADDRESS:" : Nansana" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : Kisubi Hospital" ,ADDRESS:" : P.O.Box 40" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Ntinda",PROVIDER:" : Ntinda Family Doctors" ,ADDRESS:" : Ntinda" ,SERVICES:": Out Patient",TIME:": 3:30am - 9pm" },
        {LOCATION:": Kawempe",PROVIDER:" : Kyadondo Medical Center" ,ADDRESS:" : Kawempe" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Ntinda",PROVIDER:" : Life Link Medical Centre Ntinda" ,ADDRESS:" : Ntinda" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe",PROVIDER:" : Victoria Medical Services" ,ADDRESS:" : 24 Gowers Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe",PROVIDER:" : Emmanuel Medical Center" ,ADDRESS:" : Entebbe Katabi" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe",PROVIDER:" : Millennium Optics" ,ADDRESS:" : Hill Lane, Adjacent to K-Hotels" ,SERVICES:": Optical",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : Mildmay Uganda" ,ADDRESS:" : Plot 129 Nazibwo Hill" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Kyengera",PROVIDER:" : Nobel Medical Center" ,ADDRESS:" : Watoto Church Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Lugogo",PROVIDER:" : Cambridge Health Inc" ,ADDRESS:" : Forest Mall Lugogo" ,SERVICES:": In & Out Patient",TIME:": 12 Hrs" },
        {LOCATION:": Entebbe",PROVIDER:" : Case Medicare Entebbe" ,ADDRESS:" : Plot 73-75 Kitoro Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe",PROVIDER:" : AAR Entebbe" ,ADDRESS:" : Hill Lane, Adjacent to K-Hotels" ,SERVICES:": Out Patient",TIME:": 9am-10pm" },
        {LOCATION:": Gayaza",PROVIDER:" : Peoples Medical Centre Gayaza" ,ADDRESS:" : Off Bulamu Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Ntinda",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Plot 29-37 Ntinda Rd" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Lumumba Av",PROVIDER:" : Victoria Medical Center" ,ADDRESS:" : Plot 52 Lumumba Avenue" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : Value Medical Center" ,ADDRESS:" : Bwebajja Entebbe Rd" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Bweyogerere",PROVIDER:" : AAR Bweyogerere Clinic" ,ADDRESS:" : Plot 175 Bweyogerere" ,SERVICES:": Out Patient",TIME:": 8am -9pm" },
        {LOCATION:": Bugolobi",PROVIDER:" : Sas Foundation" ,ADDRESS:" : Bugolobi, Katazamiti Rd Plot 56" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Naalya",PROVIDER:" : Case Medical Naalya" ,ADDRESS:" : Plot 826 Kiira Lane Naalya Estate" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Wakiso",PROVIDER:" : St. Joseph's Hospital-Wakiso" ,ADDRESS:" : Kirumira Road Wakiso" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Nsambya",PROVIDER:" : Kampala Family Clinic" ,ADDRESS:" : Nsambya Opp American Embassy" ,SERVICES:": Out Patient",TIME:": 8am - 9pm" },
        {LOCATION:": Bweyogerere",PROVIDER:" : Cambridge Health Inc" ,ADDRESS:" : Opposite Daniels’ Building" ,SERVICES:": Out Patient",TIME:": 7am - 8pm" },
        {LOCATION:": Kireka",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Yudah House Opp Shell Kireka" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Jinja Rd",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Jinja Rd  Kitgum House" ,SERVICES:": Out Patient",TIME:": 8am - 9pm" },
        {LOCATION:": Najjera",PROVIDER:" : St. Catherine’s Hospital Najjera" ,ADDRESS:" : Plot 1609 Najjera II" ,SERVICES:": Out Patient",TIME:": 8am - 7pm" },
        {LOCATION:": Najjera",PROVIDER:" : St. Catherine’s Hospital Najjera" ,ADDRESS:" : Plot 1609 Najjera II" ,SERVICES:": Out Patient",TIME:": 8am - 7pm" },
        {LOCATION:": Buganda Road",PROVIDER:" : AAR Buganda Road" ,ADDRESS:" : Plot 80,  Buganda Road AAR Plaza" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Buganda Road",PROVIDER:" : International Medical Center" ,ADDRESS:" : Park Royal Kampala Rd" ,SERVICES:": Out Patient",TIME:": 8am - 9pm" },
        {LOCATION:": Mityana Rd Bulaga",PROVIDER:" : Sikyomu Doctors Ltd" ,ADDRESS:" : Bulaga, Near bulaga Suites" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Plot 484, Ebb Rd,Near Roofings" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Kololo",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Upper Kololo Terrace, Plot 51A" ,SERVICES:": Out Patient",TIME:": 8am - 9pm" },
        {LOCATION:": Nansana",PROVIDER:" : Naluvule Medical Center" ,ADDRESS:" : Wakiso Hoima Rd, Near Viska Resort" ,SERVICES:": Out Patient",TIME:": 7am - 7pm" },
        {LOCATION:": Entebbe",PROVIDER:" : St. Mary's Medical Services Entebbe" ,ADDRESS:" : Plot 24 kla Rd Umeme Stage" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Plot 8 Portal Rd Next to K Hotels" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Maganjo",PROVIDER:" : Ruth Gaylord Hospital Maganjo" ,ADDRESS:" : P.O.Box 6541 K'la Maganjo Kawempe" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Naalya",PROVIDER:" : Aga Khan University Hospital Medical Centre" ,ADDRESS:" : Metroplex Mall Naalya" ,SERVICES:": Out Patient",TIME:": 9am - 9pm" },
        {LOCATION:": Namugongo",PROVIDER:" : Zia Angelina Health Center" ,ADDRESS:" : Namugongo Near Namugongo Catholic Shrine" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Entebbe Rd",PROVIDER:" : Joint Clinical Research (Jcrc)" ,ADDRESS:" : Plot 101, Upper Lubowa Estates" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Kololo",PROVIDER:" : Aga Khan University Hospital Medical Centre" ,ADDRESS:" : 3rd Floor Accacia Mall" ,SERVICES:": Out Patient",TIME:": 9am - 6pm" },
        {LOCATION:": Kampala Rd",PROVIDER:" : Aga Khan University Hospital Medical Centre" ,ADDRESS:" : Kampala Rd Next to Dtb" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Wandegeya",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Plot 111, Block 38, Near Equity Bank Wandegeya" ,SERVICES:": Out Patient",TIME:": 24/7" },
        {LOCATION:": Parliament Avenue",PROVIDER:" : AAR City Centre" ,ADDRESS:" : 2nd Floor Ecobank Building Parliamentary Avenue" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Namirembe Rd",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Plot 22 Namirembe Rd Opp Lahana Sch" ,SERVICES:": In & Out Patient",TIME:": 8am - 9pm" },
        {LOCATION:": Bugolobi",PROVIDER:" : St Mary's Family Clinic" ,ADDRESS:" : Plot 2, Muwesi Rd,Off Luthuli Avenue Bugolobi" ,SERVICES:": In & Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Kabalagala",PROVIDER:" : AAR Kabalagala" ,ADDRESS:" : Ground Floor Cavendish Univ / Gaba Road Opp American Embassy" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Bugolobi",PROVIDER:" : AAR Bugolobi" ,ADDRESS:" : Plot 10, Solent Avenue/Off Port Bell Road/Before Silver Springs Hotel" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
        {LOCATION:": Kira Road",PROVIDER:" : NSK Children and Cardiology Hospital" ,ADDRESS:" : Plot 54B Uganda Cares building Kira road K’la" ,SERVICES:": Out Patient",TIME:": 9am - 6pm" },
        {LOCATION:": Ntinda",PROVIDER:" : AAR Ntinda Clinic" ,ADDRESS:" : First Floor Bank of Africa Building Ntinda Road  Near Ntinda Police" ,SERVICES:": Out Patient",TIME:": am - 10pm" },
        {LOCATION:": Gayaza Rd",PROVIDER:" : Doctor's Medical Centre Mpererwe" ,ADDRESS:" : Plot 1716 Gayaza Rd/P.O.Box 5221 Kampala Jinja Rd  Kitgum House" ,SERVICES:": In & Out Patient",TIME:": 24/7" },   
    ]

export const HealthObstetricsAndGynaecology = [
        {LOCATION:": Luzira",PROVIDER:" : Bethany Womens Hospital" ,ADDRESS:" : Luzira" ,SERVICES:": Women Only",TIME:": 24/7" },
        {LOCATION:": Lugogo",PROVIDER:" : Marie Stopes Hospital" ,ADDRESS:" : Forest Mall Lugogo" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Butabika",PROVIDER:" : Butabika Hospital" ,ADDRESS:" : P.O.Box 7017 Kampala" ,SERVICES:": In & Out Patient",TIME:": 24/7" },
        {LOCATION:": Kira Rd",PROVIDER:" : Busingye Medical Centre" ,ADDRESS:" : Plot 54B, Kiira Rd, 1 st Floor Ug. Cares Building" ,SERVICES:": Out Patient",TIME:": 8am - 10pm" },
        {LOCATION:": Kyaliwajala",PROVIDER:" : Sarec Medicare Consultants Ltd" ,ADDRESS:" : Kireka Namugongo Rd" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
    ]

export const HealthPaediatrics = [
    {LOCATION:": Entebbe Road",PROVIDER:" : Evalina Children’s Clinic Ltd" ,ADDRESS:" : Lubowa Entebbe Rd" ,SERVICES:": Out Patient",TIME:": 24/7" },
    {LOCATION:": Naalya",PROVIDER:" : The Children’s Clinic Naalya" ,ADDRESS:" : Naalya Namugongo Rd" ,SERVICES:": Out Patient",TIME:": 8am - 11pm" },
    {LOCATION:": Bukoto",PROVIDER:" : Keserena Children's Clinic" ,ADDRESS:" : 452 Old Kira Road, Bukoto" ,SERVICES:": Out Patient",TIME:": 8:30am -9pm" },
    {LOCATION:": Bugolobi",PROVIDER:" : Childrens Medical Centre" ,ADDRESS:" : Plot 11 Bandari Rise Bugolobi" ,SERVICES:": Out Patient",TIME:": 8am - 8pm" },
    {LOCATION:": Kamwokya",PROVIDER:" : Princeton Childrens Medical Centre" ,ADDRESS:" : Kanjokya Street Kamwokya" ,SERVICES:": Out Patient",TIME:": 24/7" },
    {LOCATION:": Kololo",PROVIDER:" : Children's Clinic Kampala Limited" ,ADDRESS:" : Plot 5 Yusuf Lule Rd" ,SERVICES:": Out Patient",TIME:": 8:30am - 6pm" },
    {LOCATION:": Gayaza Road",PROVIDER:" : The Royal Children’s Medical Centre" ,ADDRESS:" : 6 Miles Along Gayaza Road" ,SERVICES:": Out Patient",TIME:": 24/7" },
]

export const HealthOpticalFacilities = [
    {LOCATION:": Namuwongo",PROVIDER:" : Lens and Frames" ,ADDRESS:" : IHK" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Kololo",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Acacia Mall Kololo" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Lugogo",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Lugogo Mall Near Game" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Entebbe",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Victoria Mall Entebbe" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Center",PROVIDER:" : City Optics" ,ADDRESS:" : Ground Floor Zebra Plaza" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Centre",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Garden City Near Stanbic" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Namugongo",PROVIDER:" : City Optics Namugongo" ,ADDRESS:" : Quality Shoping Village" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Yusuf Lule Rd",PROVIDER:" : Lens and Frames  IDC" ,ADDRESS:" : Plot 37, Yusuf Lule Rd" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Center",PROVIDER:" : City Optics Garden City" ,ADDRESS:" : Near Aristock Bookshop" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Centre",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Plot 3 Johnstone Street Kampala" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Centre",PROVIDER:" : Eye Care Centre" ,ADDRESS:" : Plot 3 Johnstone Street Kampala" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": Kampala Rd",PROVIDER:" : Med-Optics Limited" ,ADDRESS:" : Plot 47 Kampala Rd Mabirizi Cplx" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Center",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : Prime cplx, Johnstone Street" ,SERVICES:": Optical",TIME:": 9am - 7pm" },
    {LOCATION:": Gayaza Road",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : Akamwesi Mall Gayaza Road" ,SERVICES:": Optical",TIME:": 9am - 6:30pm" },
    {LOCATION:": Naguru",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : 1 st Floor Plot 63 Naguru Drive" ,SERVICES:": Optical",TIME:": 9am - 6:30pm" },
    {LOCATION:": Entebbe",PROVIDER:" : Med-Optics Entebbe" ,ADDRESS:" : Portal Road, Opp AAR" ,SERVICES:": Optical",TIME:": 8am-6pm Wk days 9am-4pm sat" },
    {LOCATION:": City Center",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : PB-1 Prime Cplx Wilson Road" ,SERVICES:": Optical",TIME:": 8:30am - 6:30pm" },
    {LOCATION:": City Center",PROVIDER:" : Lens and Frames" ,ADDRESS:" : Shop No.15, Ivory Plaza Wilson Rd, Kampala" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Center",PROVIDER:" : Lens and Frames" ,ADDRESS:" : Shop No.15, Ivory Plaza Wilson Rd, Kampala" ,SERVICES:": Optical",TIME:": 8am - 6pm" },
    {LOCATION:": City Center",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : Kalungi Plaza, Johnstone street" ,SERVICES:": Optical",TIME:": 8:30am - 6:30pm" },
    {LOCATION:": Mengo",PROVIDER:" : Millennium Optics" ,ADDRESS:" : Opp Mengo Hosp Albert Cook Rd Next to Kenjoy" ,SERVICES:": Optical",TIME:": 8:30am - 6:30pm" },
    {LOCATION:": Kampala Rd",PROVIDER:" : Med-Optics Forest Mall" ,ADDRESS:" : Forest Mall, Lugogo Bypass" ,SERVICES:": Optical",TIME:": 8am-6pm Wk days 8am-6pm Sat" },
    {LOCATION:": Kabalagala",PROVIDER:" : Millennium Optics Ltd" ,ADDRESS:" : Shop 2 CPTD Mall Gaba Rd Opp KFC" ,SERVICES:": Optical",TIME:": 9am-6:30pm 10am-3pm Sun" },
]


export const HealthDentalFacilities = [
    {LOCATION:": Naguru",PROVIDER:" : Pan Dental" ,ADDRESS:" : Naguru Branch" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Buganda Road",PROVIDER:" : Mawano Dental" ,ADDRESS:" : Buganda Road" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Buganda Road",PROVIDER:" : Pan Dental" ,ADDRESS:" : Plot 13 B Buganda Road" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Bweyogerere",PROVIDER:" : Donau Dental Centre Ltd" ,ADDRESS:" : Daniel's Building" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Kololo",PROVIDER:" : Basil's Dental" ,ADDRESS:" : Plot 64A, Prince Charles Drive" ,SERVICES:": Dental",TIME:": 8am - 5:30pm" },
    {LOCATION:": Nakasero",PROVIDER:" : Donau Dental Centre Ltd" ,ADDRESS:" : Plot 14 A, Akii Bua Rd Nakasero" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Kololo",PROVIDER:" : International Medical Centre" ,ADDRESS:" : Upper Kololo Terrace, Plot 51A" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
    {LOCATION:": Kololo",PROVIDER:" : The Aga Khan University Hospital Dental" ,ADDRESS:" : 3rd Floor Accacia Mall" ,SERVICES:": Dental",TIME:": 9am - 6pm" },
    {LOCATION:": Naalya",PROVIDER:" : Rela Dental Clinic" ,ADDRESS:" : Naalya Housing Estate | Block 222" ,SERVICES:": Dental & Maxillofacial",TIME:": 8am - 5pm" },
    {LOCATION:": Lugogo",PROVIDER:" : Bhandari Dental Care" ,ADDRESS:" : Lugogo Plaza (Nanjing Hotel), 1st Floor Plot 62b1, Lugogo Bypass Rd" ,SERVICES:": Dental",TIME:": 8am - 5pm" },
]

