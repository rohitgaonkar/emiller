import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import './MemberReport.css'
import { auth,db} from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import male from './male.jpeg';
import { getDoc,getDocs, doc,query, where,collection,getFirestore,onSnapshot,addDoc,setDoc,} from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'
import { isEmpty } from '@firebase/util';

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

function MemberReport() {


const currentLanguageCode = cookies.get('i18nextLng') || 'en'
const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
const { t , i18n } = useTranslation("common")
const [lang, setlang] = useState('en')


useEffect(() => {
  document.body.dir = currentLanguage.dir || 'ltr'
  setlang(cookies.get('i18nextLng'))
  i18next.changeLanguage(lang)
  document.title = t('app_title')
}, [currentLanguage])

  const [name, setName] = useState("");

  const zz =localStorage.getItem('id');
  const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');
const ma=localStorage.getItem('Rs');
const latef=localStorage.getItem('late');

console.log(zz);
console.log(ddid);
console.log(grp);
console.log(ma);

var tt=0;
var sa=0;
var na=0;
var ee='';
var ll='';
var la=0;
var lr=0;
var newid='';

  async function FindMe(){
    
    console.log(name);
 

    const docRef = doc(db, `/Admin/${zz}/${grp}/${ddid}/Members/`, (name));
        
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
     console.log(docSnap.data().name) ;
     document.getElementById("name").innerHTML =docSnap.data().name;
     document.getElementById("email").innerHTML=name;
     ////////////////////////////////////////////////////////////////////////////////////////////////
     const querySnapshot =await getDocs(collection(db,`Admin/${zz}/${grp}/${ddid}/Members/${name}/MonthlySavings/`));
 
     querySnapshot.forEach(doc=>{
      console.log(doc.id);
        if(ma!=doc.data().Rs){
          console.log(doc.data().Rs);
          tt=tt+(doc.data().Rs-latef);
          sa++;
        }
        else{
          console.log(doc.data().Rs);
          tt=tt+(doc.data().Rs)
          sa++
        }
      
        console.log(tt);//to get all the emails
  
    }); 
    document.getElementById("saving").innerHTML=tt;
    document.getElementById("sa").innerHTML = sa;
////////////////////////////////////////////////////////////////////////////////
    const pshot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${ddid}/Members/${name}/Loan/`));
    pshot.forEach(doc=>{
     console.log(doc.id);
     newid=doc.id;

   }); 

   console.log(newid);
/////////////////////////////////////////////////////////////////////////////////////////
   if(!newid){
    ll='loan not taken';
    la=0;
    lr=0;
    document.getElementById("loan").innerHTML = ll; 
    document.getElementById("la").innerHTML = la;   
       
   document.getElementById("loanR").innerHTML = lr;  
   }


  const docReff = doc(db, `/Admin/${zz}/${grp}/${ddid}/Members/${name}/Loan/`, (newid));
        
  const docSnapp = await getDoc(docReff);

  if (docSnapp.exists()) {

   console.log(docSnapp.data().Final_Amount_with_Interest);
   ll=docSnapp.data().Final_Amount_with_Interest;
  }
   
///////////////////////////////////////////////////////////////////////////

const ppshot =await getDocs(collection(db,`/Admin/${zz}/${grp}/${ddid}/Members/${name}/Loan/${newid}/Installment/`));
ppshot.forEach(doc=>{
 console.log(doc.data());
  la++;
  na=na+doc.data().Amount;


}); 

lr=ll-na;
  


    //document.getElementById("saving").innerHTML=tt;
   
    document.getElementById("loan").innerHTML = ll; 
     document.getElementById("la").innerHTML = la;   
        
    document.getElementById("loanR").innerHTML = lr;   

 

    }
    else{
      window.alert('Member Not Found');
    }
          

    



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
    <><div class="row  bg-dark">
          
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
      
        
          <div class="container bg-primary gradient-custom-2 ">  
            <div class="report">
            <h1>{t('member_report')}</h1> 
            <h4>{t('enter_email')} :<input type="email" onChange={e=>setName(e.target.value)} required/></h4> 
            <br/><button type="button" class="btn btn-primary" onClick={FindMe}>{t('search')}</button>
            </div>

          </div>

          <center class="container ">
        <div class='row'>

        <div class="col-xl-4 col-lg-4 col-sm-12 col-12 bg-primary" >

        <center className="Profilepic">
        <img src={male} id="myProfileImage" className="mf" alt="logo" />
        </center>
     
        </div>
        
        
        <div class="col-xl-4 col-lg-4 col-sm-6 col-6 bg-primary" >
        <h4 className="gg">{t('name')} :</h4>
          <h4 className="gg">{t('email')} :</h4>
          <h4 className="gg">{t('total_savings')} : </h4>
          <h4 className="gg">{t('savings_installment_amount')} :</h4>
          <h4 className="gg">{t('loan_amount')} :</h4> 
          <h4 className="gg">{t('loan_installment_amount')} : </h4>
          <h4 className="gg">{t('remaining_loan_amount')} :</h4>


    
        </div>

        <div class="col-xl-4 col-lg-4 col-sm-6 col-6 bg-primary" >
  
        
         <h4 className="gg" id='name'></h4>
          <h4 className="gg" id='email'></h4>
          <h4 className="gg" id='saving'></h4>
          <h4 className="gg" id='sa'></h4>
          <h4 className="gg" id='loan'></h4>
          <h4 className="gg" id='la'> </h4>
          <h4 className="gg" id='loanR'></h4>
   
        </div>

       </div>
        </center>


<footer class="col-12 bg-dark" id="info">
  <h1 className='ftext'>My First Bootstrap Page</h1>
</footer>

</>
    

  );
}

export default MemberReport;