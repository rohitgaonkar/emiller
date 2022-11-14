import React, { useEffect,useState } from 'react';
import './UpdateMyProfile.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import male from './male.jpeg';
import female from './female.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc,setDoc} from 'firebase/firestore';
import {getAuth,signOut,updateEmail } from "firebase/auth";

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

function UpdateMyProfile(props) {


  const [pname,setPName]=useState('');
  const [pemail,setPEmail]=useState('');  
  const [plname,setPLname]=useState('');
  const [paddr,setPAddr]=useState('');
  const [pstat,setPStat]=useState('');
  const [pcity,setPCity]=useState('');
  const [ppin,setPPin]=useState('');
  const [pnum,setPNum]=useState('');
  const [pdateofbirth,setPDateofbirth]=useState('');
  const [paadhar,setPAadhar]=useState('');
  const [pgender,setPGender]=useState('');

  const [useuid,setUid]=useState("");


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
  }, [currentLanguage, t])


    const auth = getAuth();

    async function getdata(){
            
              const docRef = doc(db, "Admin", (props.suid));
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data().name);
                setPName(docSnap.data().name);
                setPLname(docSnap.data().last_name);
                setPEmail(docSnap.data().email);
                setPAadhar(docSnap.data().Aadhar);
                setPAddr(docSnap.data().Address);
                setPNum(docSnap.data().Mobile_number);
                setPDateofbirth(docSnap.data().bod);
                setPCity(docSnap.data().city);
                setPStat(docSnap.data().State);
                setPPin(docSnap.data().pin);
                setPGender(docSnap.data().gender);
              
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }

        }
///////////////////////////////////////////////////////////////////////////
function ChangeMe(){

  updateEmail(auth.currentUser, (pemail)).then(() => {
    // Email updated!
    // ...
    console.log('email updated');
  }).catch((error) => {
    // An error occurred
    // ...
  });

  const collRefff = doc( db ,`/Admin/`,`${props.suid}`);

  setDoc( collRefff , {name: pname,
    last_name: plname,
    email: pemail,
    Aadhar: paadhar,
    Address: paddr,
    Mobile_number: pnum,
    bod :pdateofbirth,
    city:pcity,
    State:pstat ,
    pin:ppin  ,
    gender:pgender
  });

   navigate('/ProfilePage');

}


///////////////////////////////////////////////////
     const navigate=useNavigate();

     const handleSubmition=(e)=>{
       e.preventDefault(); 
         
       
           signOut(auth).then(() => {
     // Sign-out successful.
           navigate("/Login");
               }).catch((error) => {
     // An error happened.
           });
///////////////////////////////////////////////////


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
            
            
            <center class="container ">
        <div class='row'>
       
        <div class="col-xl-2 col-lg- col-sm-2 col-2 bg-primary" >
        
          </div>
        
        
        <div class="col-xl-5 col-lg-5 col-sm-5 col-5 bg-primary" >

          <h4 className="gg">{t('first_name')} :</h4>
          <h4 className="gg">{t('last_name')} :</h4>
          <h4 className="gg">{t('email')} :</h4>
          <h4 className="gg">{t('address')} :</h4>
          <h4 className="gg">{t('mobile_no')} : </h4>
          <h4 className="gg">{t('aadhar_no')} :</h4>
          <h4 className="gg">{t('dob')} :</h4>
          <h4 className="gg">{t('city')} :</h4>
          <h4 className="gg">{t('state')} : </h4>
          <h4 className="gg">{t('gender')} : </h4>
          <h4 className="gg" id='lastbtn'>{t('pincode')} :</h4>


          <button type="button" class="btn btn-primary" id='upbtn'><Link to={'/UpdateMyProfile'}>{t('update_profile')}</Link></button>
    
        </div>

        <div class="col-xl-3 col-lg-3 col-sm-3 col-3 bg-primary" >
     
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" value={pname} onChange={e=>setPName(e.target.value)}/>
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp"  value={plname} onChange={e=>setPLname(e.target.value)} />
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={pemail} onChange={e=>setPEmail(e.target.value)} disabled />
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={paddr} onChange={e=>setPAddr(e.target.value)} />
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={pnum} onChange={e=>setPNum(e.target.value)} />
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={paadhar} onChange={e=>setPAadhar(e.target.value)} />
        <input type="date" class="form-control" className="aa" aria-describedby="joinDateHelp" value={pdateofbirth} onChange={e=>setPDateofbirth(e.target.value)} />
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" value={pcity} onChange={e=>setPCity(e.target.value)} />
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={pstat} onChange={e=>setPStat(e.target.value)} />
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" value={pgender} onChange={e=>setPGender(e.target.value)} />
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" value={ppin} onChange={e=>setPPin(e.target.value)} />
   
        </div>
        <div class="col-xl-2 col-lg- col-sm-2 col-2 bg-primary" >

        </div>

       </div>
        </center>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default UpdateMyProfile;

