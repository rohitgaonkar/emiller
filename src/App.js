import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { auth,db } from './Firebase';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Forgot from './pages/login/Forgot';
import ProfilePage from './pages/ProfilePage';
import UpdateSHG from './pages/UpdateSHG';
import AddMember from './pages/AddMember';
import SHG from './pages/SHG';
import ShgProfilePage from './pages/ShgProfilePage';
import ViewMembers from './pages/ViewMembers';
import AddSavings from './pages/AddSavings';
import SetFieldValues from './pages/SetFieldValues';
import ViewSavings from './pages/ViewSavings';
import MemberHome from  './pages/MemberHome';
import MemberProfilePage from './pages/MemberProfilePage';
import MemberViewSavings from './pages/MemberViewSavings';
import RequestLoan from './pages/RequestLoan';
import ViewLoanRequest from './pages/ViewLoanRequest';
import AddInstallment from './pages/AddInstallment';
import Transection from './pages/Transection';
import AddBank from './pages/AddBank';
import ViewActiveLoans from './pages/ViewActiveLoans';
import ViewFinishedLoans from './pages/ViewFinishedLoans';
import MemberReport from './pages/MemberReport';
import AnnualReport from './pages/AnnualReport';
import MemberViewLoan from './pages/MemberViewLoan';
import MonthlyReport from './pages/MonthlyReport';
import DeleteMember from './pages/DeleteMember';
import ViewSettings from './pages/ViewSettings';
import UpdateMyProfile from './pages/UpdateMyProfile';
import UpdateMemberProfile from './pages/UpdateMemberProfile';
import Help from './pages/Help';
import { data } from 'autoprefixer';





function App() {

  const [useName,setUseName]=useState("");
  const [useuid,setUid]=useState(""); 


  useEffect(()=>{
   
    auth.onAuthStateChanged(user=>{
       
      if(user){
      setUseName(user.displayName);
      setUid(user.uid);
      
      localStorage.setItem('id',user.uid);

      getdata();
     
    }
    else {setUseName("");
          setUid('');
  }

  var MyDate = new Date();
  var MyDateString;

  MyDate.setDate(MyDate.getDate() + 30);
  
  MyDateString = MyDate.getFullYear() + '-'
               + ('0' + (MyDate.getMonth())).slice(-2) + '-'
               +  ('0' + MyDate.getDate()).slice(-2);

 // console.log(MyDateString);

  localStorage.setItem('date', MyDateString);

    });
  },[]);

 

  const zz =localStorage.getItem('id');
  const xx=localStorage.getItem('date');
 var greter=0;
  var arrayId=[];


  async function getdata(){

    const docRef = doc(db, "Admin/", (zz));
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                  //console.log("Document data:", docSnap.data().shg);
                ///console.log(xx);
                localStorage.setItem('groupName',docSnap.data().shg);

         
  
                let a='Admin/'+zz+'/'+docSnap.data().shg;
              //   //console.log(zz);

              //   const pshot =await getDocs(collection(db,a));
              //   pshot.forEach(doc=>{
               
              //       if(doc.id!='Bank'){
              //         arrayId.push(doc.id);
              //       }
              //  });

              //  console.log(arrayId);

              //   for(var g=0;g<arrayId.length;g++){
                  
              //     if(greter<=arrayId[g]){
              //       greter=arrayId[g]

              //     }

              //   }

              

               
              //   const coll = doc( db , a,`${greter}`);
              //   const docSnap = await getDoc(coll);
              
              //   if (docSnap.exists()) {
              //    localStorage.setItem('period',docSnap.id);
              //    localStorage.setItem('Rs',docSnap.data().monthly_paying_amount);
              //    localStorage.setItem('late',docSnap.data().late_fee);
              // localStorage.setItem('sdate',docSnap.data().last_date_of_savings);
              // localStorage.setItem('Idate',docSnap.data().last_date_of_Loan__Installment);
              // localStorage.setItem('Intrst',docSnap.data().loan_interest_value);
              // localStorage.setItem('finaldate',docSnap.data().end_date);
                
              //   }
              
              //   else{
              //     console.log('not found');
              //   }

                const q = query(collection(db,a), where(`end_date`, ">=", xx));
          
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                      //console.log(doc.id);
                             
                              localStorage.setItem('period',doc.id);
                                localStorage.setItem('Rs',doc.data().monthly_paying_amount);
                                localStorage.setItem('late',doc.data().late_fee);
                             localStorage.setItem('sdate',doc.data().last_date_of_savings);
                             localStorage.setItem('Idate',doc.data().last_date_of_Loan__Installment);
                             localStorage.setItem('Intrst',doc.data().loan_interest_value);
                             localStorage.setItem('finaldate',doc.data().end_date);
                                
                            });
                
                
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }

      
  
  }
const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');
const price=localStorage.getItem('Rs');
const savingdate=localStorage.getItem('sdate');
const latef=localStorage.getItem('late');
const lastDateInstallment = localStorage.getItem('Idate');
const Interest =localStorage.getItem('Intrst');
const finalDate =localStorage.getItem('finaldate');


//console.log(ddid);
//console.log(grp);


    return(

        <div className='App'>
              

          <Router>
              <Routes>
                    <Route path='/Login' element={<Login />}/>
                    <Route path='/Forgot' element={<Forgot />}/>
                    <Route path='/SHG' element={<SHG UpdateSHG sid={zz}/>}/>
                    <Route path='/Signup' element={<Signup/>}/>
                    <Route path='/ProfilePage' element={<ProfilePage suid={zz}/>}/>
                    <Route path='/UpdateMyProfile' element={<UpdateMyProfile suid={zz}/>}/>
                    <Route path='/UpdateSHG' element={<UpdateSHG puid={zz} date={xx} ggg={grp}/>}/> 
                    <Route path='/ViewSettings' element={<ViewSettings dire={useuid} sggg={grp} sss={ddid}  />}/> 
                    <Route path='/SetFieldValues' element={<SetFieldValues ssuid={useuid} sggg={grp} sss={ddid}  />}/> 
                    <Route path='/ViewMembers' element={<ViewMembers mmuid={zz} mmdate={xx} ggg={grp} ddd={ddid}/>}/>
                    <Route path='/ViewSavings' element={<ViewSavings mmuid={zz} mmdate={xx} ggg={grp} ddd={ddid}/>}/>
                    <Route path='/AddSavings' element={<AddSavings auid={zz} adate={xx} agg={grp} add={ddid} paying={price} sdatel={savingdate} latefee={latef} intres={Interest} />}/>
                    <Route path='/AddInstallment' element={<AddInstallment Iuid={zz} Idate={xx} Iggg={grp} Iddd={ddid} Iaying={price} Idatel={lastDateInstallment} Ilatefee={latef} intres={Interest}/>}/>
                    <Route path='/ShgProfilePage' element={<ShgProfilePage puid={zz} date={xx}/>}/>
                    <Route path='/AddMember' element={<AddMember muid={zz} mdate={xx}/>}/>
                    <Route path='/ViewLoanRequest' element={<ViewLoanRequest mmuid={zz} mmdate={xx} ggg={grp} ddd={ddid} fdate={finalDate} intres={Interest}/>}/>
                    <Route path='/MemberHome' element={<MemberHome mdate={xx}/>}/>
                    <Route path='/MemberProfilePage' element={<MemberProfilePage />}/>
                    <Route path='/MemberViewSavings' element={<MemberViewSavings />}/>
                    <Route path='/RequestLoan' element={<RequestLoan mdate={xx}/>}/>
                    <Route path='/MemberViewLoan' element={<MemberViewLoan />}/>
                    <Route path='/Transection' element={<Transection mdate={xx} usdd={zz} usp={grp} sss={ddid}/>}/>
                    <Route path='/AddBank' element={<AddBank mdate={xx} ssuid={useuid} sggg={grp} sss={ddid}/>}/>
                    <Route path='/ViewActiveLoans' element={<ViewActiveLoans mdate={xx} vvid={zz} vvgg={grp} vvdd={ddid}/>}/>
                    <Route path='/ViewFinishedLoans' element={<ViewFinishedLoans mdate={xx}/>}/>
                    <Route path='/MemberReport' element={<MemberReport mdate={xx}/>}/>
                    <Route path='/AnnualReport' element={<AnnualReport mdate={xx}/>}/>
                    <Route path='/MonthlyReport' element={<MonthlyReport mdate={xx}/>}/>
                    <Route path='/DeleteMember' element={<DeleteMember mdate={xx}/>}/>
                    <Route path='/Help' element={<Help />}/>
                    <Route path='/UpdateMemberProfile' element={<UpdateMemberProfile mdate={xx}/>}/>

                   
                    <Route path='/' element={<Home name={zz} />}/>
              </Routes>
          </Router>
        </div>
    
  );
}

export default App;
