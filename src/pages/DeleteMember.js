import React, { useEffect,useState } from 'react';
import './DeleteMember.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import male from './male.jpeg';
import female from './female.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc, doc,deleteDoc} from 'firebase/firestore';
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



function DeleteMember() {


  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
  }, [currentLanguage, t])


  const zz =localStorage.getItem('id');
  const ddid=localStorage.getItem('period');
const grp=localStorage.getItem('groupName');

  const [name, setName] = useState("");
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


console.log(name);

    async function getdata(){
            
      const docRef = doc(db, `/Admin/${zz}/${grp}/${ddid}/Members/`, (name));
        
      const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data().name);
                setPName(docSnap.data().name);
              //  setPLname(docSnap.data().last_name);
                setPEmail(docSnap.data().email);
                setPAadhar(docSnap.data().aadhar_number);
                setPAddr(docSnap.data().address);
                setPNum(docSnap.data().number);
                setPDateofbirth(docSnap.data().date_of_birth);
                // setPCity(docSnap.data().city);
                // setPStat(docSnap.data().State);
                setPPin(docSnap.data().nominee_Name);
                setPGender(docSnap.data().gender);
              
              } else {
                // doc.data() will be undefined in this case
                    window.alert("No such document!");
              }

        }

///////////////////////////////////////////////////


async function deleteMe(){

  if (window.confirm("Do you really want Delete This Member?")) {

    const docRef = doc(db, `/Admin/${zz}/${grp}/${ddid}/Members/`, (name));  
    const docSnap = await deleteDoc(docRef);
    navigate("/");
   
  }
  
}

///////////////////////////////////////////////////////
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

   
        <div class="col-xl-4 col-lg-4 col-sm-12 col-12 bg-success" >
        <h4>{t('enter_email')}:<input type="email" onChange={e=>setName(e.target.value)} required/></h4> 
          <button type="button" class="btn btn-primary" onClick={getdata} >{t('search')}</button>
        <center className="takeup">
          
        </center>
      
        </div>
        
        
        <div class="col-xl-4 col-lg-4 col-sm-6 col-6 bg-primary" >

        <h4 className="gg">{t('name')} :</h4>
          <h4 className="gg">{t('email')} :</h4>
          <h4 className="gg">{t('address')} :</h4>
          <h4 className="gg">{t('mobile_no')} : </h4>
          <h4 className="gg">{t('aadhar_no')} :</h4>
          <h4 className="gg">{t('dob')} :</h4>
       
          <h4 className="gg">{t('gender')} : </h4>
          <h4 className="gg" id='lastbtn'>{t('nominee_name')} :</h4>


          <button type="button" class="btn btn-primary" id='upbtn'  onClick={deleteMe}>{t('delete_member')}</button>
    
        </div>

        <div class="col-xl-4 col-lg-4 col-sm-6 col-6 bg-primary" >

         <h4 className="aa">{pname}</h4> 
          <h4 className="aa">{pemail}</h4>
          <h4 className="aa">{paddr}</h4>
          <h4 className="aa">{pnum}</h4>
          <h4 className="aa">{paadhar}</h4>
          <h4 className="aa">{pdateofbirth}</h4>
         
          <h4 className="aa">{pgender}</h4>
          <h4 className="aa">{ppin}</h4>
   
        </div>

       </div>
        </center>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default DeleteMember;

