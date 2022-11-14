import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';
import logo from './logo.png';
import profile from './profile.jpeg';


import './AddMember.css'

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



function AddMember(props) {


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



////////////////////////
const [Mname, setMname]=useState('');
const [Joining, setJoining]=useState('');
const [Mnumber, setMnumber]=useState('');
const [Mdof, setMdof]=useState('');
const [Maadhar, setMaadhar]=useState('');
const [Maddress, setMaddress]=useState('');
const [Mnominee, setMnominee]=useState('');
//const [Mrelation, setMrelation]=useState('');
const [Mgender, setGender]=useState('');
const  [getshg,setGetShg]=useState('');
const  [getemail,setGetemail]=useState('');
const  [getpass,setGetpass]=useState('');
const [useName,setUseName]=useState("");
const [getid,setId]=useState('');

const [serrmsg,setAErrmsg]=useState('');

const navigate=useNavigate();

const handleSubmition=(e)=>{
  e.preventDefault();

  if(!Mname || !Joining || !Mnumber || !Mdof || !Maadhar || !Maddress || !Mnominee  || !Mgender){
      setAErrmsg("Fill all the fields");
      return;
 }

 if(Mnumber.length!=10){
              
  alert('mobile number should 10 digit and should contain only numbers');
   return; 
 }

if(Maadhar.length!=12){
       
 alert('Aadhar number should 12 digits');
  return; 
}
  setAErrmsg("");

  ///////////get Data//////////

//console.log(props.muid);
getdata();

async function getdata(){

  const docRef = doc(db, "Admin/", (props.muid));
              const docSnap = await getDoc(docRef);
              
              if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().shg);
              console.log(props.mdate);
              setGetShg(docSnap.data().shg);
              console.log(getshg);

              setGetpass(Mname+'12345');
             setGetemail(Mname+Mnumber+'@'+docSnap.data().shg+'.com');

              let a='Admin/'+props.muid+'/'+docSnap.data().shg;
              console.log(props.muid);
              const q = query(collection(db,a), where(`end_date`, ">=", props.mdate));
        
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                    console.log(doc.id);
                            setId(doc.id);
                              
                          });
              
              
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            
    

}



////////////////////////////////// set data /////////////////////////////////////////////////////
let pth= '/Admin/'+props.muid+'/'+ getshg + '/' + getid + '/Members';
const collRef = doc( db , pth,`${getemail}`);
     setDoc( collRef , {name: Mname,
     joining_date:Joining,
     number:Mnumber,
     date_of_birth:Mdof,
     gender:Mgender,
     aadhar_number:Maadhar,
     address:Maddress,
     nominee_Name:Mnominee,
     email:getemail,
     passworld:getpass
});

navigate('/ViewMembers');


////////////////////////////////////////////////////////////////////////////////////   

//////////////////////




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
            <h1>{t('add_member_page')}</h1>
          <h3>{t('add_member')}</h3>

          <center >
          <form class=" col-sm-6">

          <div class="mb-3">
                    <label for="exampleInputFirstName" class="form-label">{t('name')}</label>
                    <input type="fname" class="form-control" id="exampleInputFirstName" aria-describedby="fnameHelp" onChange={e=>setMname(e.target.value)} required/>
                    <div id="fnameHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputJoiningDate" class="form-label">{t('joining_date')}</label>
                    <input type="date" class="form-control" id="exampleInputJoiningDate" aria-describedby="joinDateHelp" onChange={e=>setJoining(e.target.value)} required/>
                    <div id="joinDateHelp" class="form-text"></div>
                  </div>
                  
                  <div class="mb-3">
                    <label for="exampleInputMobile" class="form-label">{t('mobile_no')}</label>
                    <input type="fname" class="form-control" id="exampleInputMobile" aria-describedby="mnumberHelp" onChange={e=>setMnumber(e.target.value)} required/>
                    <div id="mnumberHelp" class="form-text"></div>
                  </div>
                 
                  <div class="mb-3">
                    <label for="exampleInputDate" class="form-label">{t('dob')}</label>
                    <input type="date" class="form-control" id="exampleInputDate" aria-describedby="fnameHelp" onChange={e=>setMdof(e.target.value)} required/>
                    <div id="dateHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputDate" class="form-label">{t('gender')}</label>
                    <input type="text" class="form-control" id="examplegender" aria-describedby="fnameHelp" onChange={e=>setGender(e.target.value)} required/>
                    <div id="dateHelp" class="form-text"></div>
                  </div>

                 
                  <div class="mb-3">
                    <label for="exampleInputAadhar" class="form-label">{t('aadhar_no')}</label>
                    <input type="aadhar" class="form-control" id="exampleInputAadhar" aria-describedby="aadharHelp" onChange={e=>setMaadhar(e.target.value)} required/>
                    <div id="aadharHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputAddress" class="form-label">{t('address')}</label>
                    <input type="address" class="form-control" id="exampleInputAddress" aria-describedby="addressHelp" onChange={e=>setMaddress(e.target.value)} required/>
                    <div id="addressHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputNominee" class="form-label">{t('nominee_name')}</label>
                    <input type="nominee" class="form-control" id="exampleInputNominee" aria-describedby="nomineeHelp" onChange={e=>setMnominee(e.target.value)} required/>
                    <div id="nomineeHelp" class="form-text"></div>
                  </div>
                  <h4> {serrmsg}</h4>

       
                  <button type="submit" class="btn btn-primary" onClick={handleSubmition} >{t('add_member')}</button>
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

export default AddMember;










              
            