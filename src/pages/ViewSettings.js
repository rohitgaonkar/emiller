import React, { useEffect,useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc} from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";

import profile from './profile.jpeg';

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


function ViewSettings(props) {


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


  const [MothlyPayingAmount, setMothlyPayingAmount]=useState('');
  const [SavingLastDate, setSavingLastDate]=useState('');
  const [InstallmentLastDate, setInstallmentLastDate]=useState('');
  const [LoanIntersetValue, setLoanIntersetValue]=useState('');
  const [LateFee, setLateFee]=useState('');

  const zz =localStorage.getItem('id');
  const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');

  const [useuid,setUid]=useState("");




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
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////
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
///////////////////////////////////////////////////


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
      
            
            <center class="container ">
        <div class='row'>
            
        <div class="col-xl-6 col-lg-6 col-sm-6 col-6 bg-primary" >
           
           <h4 className="gg">{t('set_savings_amount')} :</h4>
           <h4 className="gg">{t('set_savings_date')}:</h4>
           <h4 className="gg">{t('set_interest')}: </h4>
           <h4 className="gg">{t('set_loan_date')}:</h4>
           <h4 className="gg">{t('set_late_fee')} :</h4>
        
        
 
           <button type="button" class="btn btn-primary" id='upbtn' ><Link to={'/SetFieldValues'}>{t('set_values')}</Link> </button>
          
         </div>
 
         <div class="col-xl-6 col-lg-6 col-sm-6 col-6 bg-primary" >

          <h4 className="aa">{MothlyPayingAmount}</h4>
          <h4 className="aa">{SavingLastDate}</h4>
          <h4 className="aa">{LoanIntersetValue}</h4>
          <h4 className="aa">{InstallmentLastDate}</h4>
          <h4 className="aa">{LateFee}</h4>
           
    
         </div>
 
        
       </div>
        </center>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default ViewSettings;

