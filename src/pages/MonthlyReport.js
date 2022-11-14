import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import './MonthlyReport.css'
import { auth,db} from '../Firebase';
import { getDoc,getDocs, doc,query, where,collection,addDoc,setDoc,collectionGroup} from 'firebase/firestore';
import { async } from '@firebase/util';
import { getElementError } from '@testing-library/react';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'



const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'hin',
    name: 'Hindi',
  },
  {
    code: 'mar',
    name: 'Marathi',
  },
  {
    code: 'kon',
    name: 'Konkani',
  }
]


function MonthlyReport() {

const currentLanguageCode = cookies.get('i18nextLng') || 'en'
const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
const { t , i18n } = useTranslation("common")
const [lang, setlang] = useState('en')


useEffect(() => {
  document.body.dir = currentLanguage.dir || 'ltr'
  setlang(cookies.get('i18nextLng'))
  i18next.changeLanguage(lang)
  document.title = t('app_title')
}, [currentLanguage,t])


  const zz =localStorage.getItem('id');
  const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');
const ma=localStorage.getItem('Rs');
const latef=localStorage.getItem('late');

const[savings,setSavings]=useState();
const[fine,setFine]=useState();
const[name,setName]=useState('');
const[startd,setStartd]=useState('');
const[endd,setEndd]=useState('');
const[pin,setPin]=useState('');
const[loan,setLoan]=useState('');
const[loanr,setLoanR]=useState('');
const[intre,setIntre]=useState('');
const[grand,setGrand]=useState('');
const[vatani,setvatani]=useState();
const[member,setMembers]=useState();



    var emails=[];
    var totalmembers=0;
    var latefee=0;
    var tt=0;
    var ll=0;
    var ff=0;
    var names='';
    var sd='';
    var ed='';
    var pins='';
    var intress=0;
    var lala=0;
    var flag=false;

//window.onload=getdata();
// useEffect(()=>{
//    getdata();
// },[]);

var getdate;
var getperiod;

function Submition(e){
  e.preventDefault();
    getperiod=document.getElementById('getperiod').value;
    getdate=document.getElementById('getdate').value;

if(!getperiod){
  getperiod=ddid;
 // console.log('hello');
}
if(!getdate){

  window.alert('please select month')
  return;
}

//console.log(getdate.slice(0,7),getperiod);

getdata();

}

async function getdata(){

  const docRef = doc(db, `/Admin/${zz}/${grp}/`, (getperiod));
        
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log(docSnap.data().name);
     names=(docSnap.data().name);
     //console.log(docSnap.data().start_date);
      sd=(docSnap.data().start_date);
      //console.log(docSnap.data().end_date);
      ed=(docSnap.data().end_date);
      //console.log(docSnap.data().pincode);
      pins=(docSnap.data().pincode);


    }
    else{
      window.alert('This Period Not Exits');
      return;
    }

   
   
    //console.log(name,sd,ed,pin);
    /////////////////////////////////////////////////////////////////////////////////////////
    const pshot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${getperiod}/Members/`));
    pshot.forEach(doc=>{
     emails.push(doc.id);
     totalmembers++;

   }); 
   //console.log(emails);
   ///////////////////////////////////////////////////////////////////////////////

   for(var i=0;i<emails.length;i++){
    const shot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${getperiod}/Members/${emails[i]}/MonthlySavings/`));
    shot.forEach(doc=>{
     // console.log(doc.id);
      if(doc.id.slice(0,7)==getdate.slice(0,7) || doc.id.slice(0,7)== parseInt(getdate.slice(0,7))){
        if(doc.data().Rs){
          //console.log(doc.data().Rs);
          tt=tt+(doc.data().Rs-latef);
          latefee++;
        }
        else{
          //console.log(doc.data().Rs);
          tt=tt+(doc.data().Rs)
       
        }
        flag=true;
      }
     
  
 
   }); 

   }

   if(!flag){
    window.alert('no records found of this month please select correct date');
    return;
   }
   

   ///////////////////////////////////////////////////////////////////////////////////

   for(var j=0;j<emails.length;j++){
    const shot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${getperiod}/Members/${emails[j]}/Loan/`));
    shot.forEach(doc=>{
     // console.log(doc.id.slice(0,7));
    

        lala=lala+parseFloat(doc.data().Laon_Amount);

        // console.log(lala);
        // console.log(doc.data().Final_Amount_with_Interest);
       // intress=intress+(parseFloat(doc.data().Final_Amount_with_Interest)-parseFloat(doc.data().Laon_Amount));
          GiveMeLoan(doc.id,parseFloat(doc.data().Monthly_Interest));


      
     
 
   }); 

   }

   async function GiveMeLoan(id,intres){
    const hot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${getperiod}/Members/${emails[j]}/Loan/${id}/Installment`));
    hot.forEach(doc=>{

      console.log(doc.id);
      if(doc.id.slice(0,7)==getdate.slice(0,7) || doc.id.slice(0,7)== parseInt(getdate.slice(0,7)) ){
        console.log(intres);
        console.log(doc.data().Amount);
        ll=ll+parseFloat(doc.data().Amount);
        intress=intress+intres;
        if(doc.data().latefee!=null){
              latefee++;
         // console.log(doc.data().latefee);
        }
        
      }


   });   

   }


 var final=0;
    final=parseFloat(latefee*latef)+tt+intress
   //console.log(tt);
   //console.log((latefee*latef));
   setSavings(tt);
   setFine((latefee*latef));
   setName(names);
   setStartd(sd);
   setEndd(ed);
   setPin(pins);
   setLoan(ll);
   setIntre(intress.toFixed( 2 ));
   setLoanR(lala.toFixed( 2 ));
   setGrand(final.toFixed( 2 ));
   setvatani((final/emails.length).toFixed( 2 ));
   setMembers(emails.length);
  //  document.getElementById("saving").innerHTML=tt;
  //   document.getElementById("fine").innerHTML=latefee*latef;

   

}
const navigate=useNavigate();

const handleSubmition=(e)=>{
  e.preventDefault(); 
    
  const auth = getAuth();
      signOut(auth).then(() => {
// Sign-out successful.
      navigate("/Login");
          }).catch((error) => {
// An error happened.
      });
    }


  return (
    <> <div class="row  bg-dark">
          
    <div class="col-xl-1 col-lg-2 col-sm-2 col-3 ">

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                  <div class="container-fluid">
                   
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                      <ul class="navbar-nav">
                        <li class="nav-item">
                          <a class="nav-link"><Link to={'/'}>{t('home')}</Link> </a>
                        </li>
                    
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">{t('language')}</a>
                                            
                          <ul className="dropdown-menu">

                            {languages.map(({ code, name}) => (
                              <li key={code}>
                                <a
                                  href="#"
                                  className={classNames('dropdown-item', {
                                    disabled: currentLanguageCode === code,
                                  })}
                                  onClick={() => {
                                    //alert(code)
                                    document.cookie = `i18nextLng = ${code}`
                                    i18next.changeLanguage(code)
                                  }}
                                >
                                <span
                                  className={`${code} mx-2`}
                                  style={{
                                    opacity: currentLanguageCode === code ? 0.5 : 1,
                                  }}>
                                </span>
                                {name}
                                </a>
                              </li>
                            ))}
                            </ul>
                          </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                                
      </div>


      <div class="col-xl-10 col-lg-8 col-sm-8 col-6">
              <a class="navbar-brand me-auto" href="#"><Link to={'/'}><img src={logo} className="App-logo" alt="logo" /></Link> </a>
              </div>
        <div class="col-xl-1 col-lg-2 col-sm-2 col-3" >
             
              <li class="nav-item dropdown   me-auto">
                <a class="nav-link dropdown-toggle bg-dark" href="#" role="button" data-bs-toggle="dropdown"> <img src={profile} className="profile"  alt="logo" /></a>
                <ul class="dropdown-menu ">
                        <li><a class="dropdown-item" ><Link to={'/ProfilePage'}>{t('profile')}</Link> </a></li>
                        <li><a class="dropdown-item" href="#">{t('change_password')}</a></li>
                        <li><a class="dropdown-item" onClick={handleSubmition}>{t('log_out')}</a></li>
              </ul>
            </li>
        </div>
  </div>
 
            
        <div class='row'>
        <h1>{t('monthly_report')}</h1> 
        <div class="col-xl-6 col-lg-6 col-sm-6 col-12 " >
            <div class="col-xl-3 col-lg-3 col-sm-3 col-12 ">
              <div  id='right'>
                  <input type="text" class="form-control" id="getperiod" aria-describedby="joinDateHelp" placeholder='enter period' required/>
                <input type="date" class="form-control" id="getdate" aria-describedby="joinDateHelp"  required/>
                <button type="submit" class="btn btn-primary" onClick={Submition} >{t('search')}</button>
              </div>
            
            </div>
          
        </div>
        <div class="col-xl-6 col-lg-6 col-sm-6 col-12 ">

        <div className='left'>
                  
                  <h4>{t('group_name')} : {name}   
                  <br/>{t('start_date')} : {startd}  
                  <br/>{t('end_date')} : {endd} 
                  <br/>{t('pincode')} : {pin}
                  </h4>
          </div>
                      
        </div>


        </div>
          <div class="container bg-primary gradient-custom-2 ">  
            
            <form id="theForm" class="row g-2 mt-5 ">
                <div class="col-sm-6 col-12">
                    <label for="interest" class="form-label" ><h4>{t('total_interest')} :{intre} </h4></label>
                </div>
                <div class="col-sm-6 col-12">
                    <label for="membersaving" class="form-label" id='saving'><h4>{t('total_savings')} :{savings} </h4></label>
                </div>
             
                <div class="col-sm-6 col-12">
                    <label for="memberloanrepay" class="form-label"><h4>{t('loan_repaid')} : {loan}</h4></label>
                </div>

                <div class="col-sm-6 col-12">
                    <label for="finelatefee" class="form-label" id='fine'><h4>{t('late_fees')} :{fine} </h4></label>
                </div>
                <div class="col-sm-6 col-12">
                    <label for="bankloan" class="form-label"><h4>{t('annual_amount')} :{grand} </h4></label>
                </div>

                <div class="col-sm-6 col-12">
                    <label for="bankbalance" class="form-label"><h4> {t('total_no_of_members')} : {member}</h4></label>
                </div>
            </form>
          </div>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default MonthlyReport;