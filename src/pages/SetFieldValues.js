import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';
import logo from './logo.png';
import profile from './profile.jpeg';
import './SetFieldValues.css'

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



function SetFieldValues(props) {

  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
    getdata();
  }, [currentLanguage])

////////////////////////
const [MothlyPayingAmount, setMothlyPayingAmount]=useState('');
const [SavingLastDate, setSavingLastDate]=useState('');
const [InstallmentLastDate, setInstallmentLastDate]=useState('');
const [LoanIntersetValue, setLoanIntersetValue]=useState('');
const [LateFee, setLateFee]=useState('');

const [serrmsg,setAErrmsg]=useState('');
const zz =localStorage.getItem('id');
const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');

const navigate=useNavigate();
console.log(props.sggg);
console.log(props.sss);



async function getdata(){
            
  const docRef = doc(db, `Admin/${zz}/${grp}`, (ddid));
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    setInstallmentLastDate(docSnap.data().last_date_of_Loan__Installment)
    setLateFee(docSnap.data().late_fee)
    setLoanIntersetValue(docSnap.data().loan_interest_value)
    setMothlyPayingAmount(docSnap.data().monthly_paying_amount)
    setSavingLastDate(docSnap.data().last_date_of_savings)
    
  
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}

const handleSubmition=(e)=>{
  e.preventDefault();

  if(!MothlyPayingAmount || !SavingLastDate || !InstallmentLastDate || !LoanIntersetValue || !LateFee ){
      setAErrmsg("Fill all the fields");
      return;
 }
  setAErrmsg("");



////////////////////////////////// set data /////////////////////////////////////////////////////

console.log(zz,grp,ddid);
    const collRefff = doc( db , `/Admin/${zz}/${grp}/${ddid}`);
    setDoc( collRefff , {
      monthly_paying_amount:MothlyPayingAmount,
      last_date_of_savings:SavingLastDate,
      last_date_of_Loan__Installment:InstallmentLastDate,
      loan_interest_value:LoanIntersetValue,
      late_fee:LateFee
    }, { merge: true });

    navigate("/ViewSettings");


}


  return (
    <>
          <div class="row  bg-dark">
          
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
            <p>
            <h1>{t('set_field_values')}</h1>
          
          <center >
          <form class=" col-sm-6">

                  <div class="mb-3">
                    <label for="exampleInputFirstName" class="form-label">{t('set_savings_amount')}</label>
                    <input type="fname" class="form-control" id="exampleInputFirstName" aria-describedby="fnameHelp" value={MothlyPayingAmount} onChange={e=>setMothlyPayingAmount(e.target.value)} required/>
                    <div id="fnameHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputSavingLastDateDate" class="form-label">{t('set_savings_date')}</label>
                    <input type="text" class="form-control" id="exampleInputSavingLastDateDate" aria-describedby="joinDateHelp" value={SavingLastDate} onChange={e=>setSavingLastDate(e.target.value)} required/>
                    <div id="joinDateHelp" class="form-text"></div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="exampleInputMobile" class="form-label">{t('set_loan_date')}</label>
                    <input type="text" class="form-control" id="exampleInputMobile" aria-describedby="InstallmentLastDateHelp" value={InstallmentLastDate} onChange={e=>setInstallmentLastDate(e.target.value)} required/>
                    <div id="InstallmentLastDateHelp" class="form-text"></div>
                  </div>
                 
                  <div class="mb-3">
                    <label for="exampleInputDate" class="form-label">{t('set_interest')}</label>
                    <input type="text" class="form-control" id="exampleInputDate" aria-describedby="fnameHelp" value={LoanIntersetValue} onChange={e=>setLoanIntersetValue(e.target.value)} required/>
                    <div id="dateHelp" class="form-text"></div>
                  </div>

            
                  <div class="mb-3">
                    <label for="exampleInputAadhar" class="form-label">{t('set_late_fee')}</label>
                    <input type="aadhar" class="form-control" id="exampleInputAadhar" aria-describedby="aadharHelp" value={LateFee} onChange={e=>setLateFee(e.target.value)} required/>
                    <div id="aadharHelp" class="form-text"></div>
                  </div>

                 
                  <h4> {serrmsg}</h4>

       
                  <button type="submit" class="btn btn-primary" onClick={handleSubmition} >{t('set_values')}</button>
                </form>
                </center>
        </p>
            
            </div>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default SetFieldValues;










              
            