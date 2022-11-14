import React, { useEffect,useState } from 'react';
import './ViewMembers.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs, doc,query, where,collection,getFirestore,onSnapshot} from 'firebase/firestore';
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


function ViewMembers(props) {

  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
//getdata();
   
  }, [currentLanguage,t])

  window.onload =getdata();
 
 
    async function getdata(){
      console.log(props.mmuid);

            
              const querySnapshot =await getDocs(collection(db,`Admin/${props.mmuid}/${props.ggg}/${props.ddd}/Members`));
                  var Members = [];
                   querySnapshot.forEach(doc=>{

                    Members.push(doc.data());

                      });
              AddAllItemsToTable(Members);

        }

        
///////////////////////////////////////////////////////////////////////////

var stdNo=0;
//var tbody =document.getElementById('tbody1');
var table = document.getElementById("table");
 function AddItemToTable(Name,Email,Gender,Address,Aadhar,Birth,Mobile,Joining,Nominee){


        var row = table.insertRow(-1);
  		  var cell1 = row.insertCell(0);
  		  var cell2 = row.insertCell(1); 
  		  var cell3 = row.insertCell(2);
  		  var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
     
        cell1.innerHTML=++stdNo;
        cell2.innerHTML=Name;
        cell3.innerHTML=Email;
        cell4.innerHTML=Gender;
        cell5.innerHTML=Address;
        cell6.innerHTML=Aadhar;
        cell7.innerHTML=Birth;
        cell8.innerHTML=Mobile;
        cell9.innerHTML=Joining;
        cell10.innerHTML=Nominee;

      
           
         

 }



 function AddAllItemsToTable(Members){
     var stdNo=0;
  //tbody.innerHTML="";

  Members.forEach(e=>{

    for(var d=0;d<table.rows.length;d++){
      console.log(table.rows[d].cells[2].innerHTML);

      if(table.rows[d].cells[2].innerHTML==e.email){
        table.deleteRow(d);
      }
    }

    AddItemToTable(e.name,e.email,e.gender,e.address,e.aadhar_number,e.date_of_birth,e.number,e.joining_date,e.nominee_Name);
  
  });
 }



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
            
        <div class="container" >
        <h1>{t('list_of_members')}</h1>
        
          <div class="table-responsive">
    <table class="table table-bordered" id='table'>
      <thead>
        <tr>
          <th>{t('sr_no')}</th>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('gender')}</th>
          <th>{t('address')}</th>
          <th>{t('aadhar_no')}</th>
          <th>{t('dob')}</th>
          <th>{t('mobile_no')}</th>
          <th>{t('joining_date')}</th>
          <th>{t('nominee_name')}</th>
        </tr>
      </thead>
      <tbody id='tbody1'>
    
      </tbody>
    </table>
  </div>
       

        </div>

              
             
                  

           
<footer class="container-fluid bg-dark" id="inffo">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default ViewMembers;

