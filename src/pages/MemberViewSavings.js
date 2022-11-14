import React, { useEffect,useState } from 'react';
import './MemberViewSavings.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { db} from '../Firebase';
import { getDoc,getDocs, doc,query, where,collection,getFirestore,onSnapshot} from 'firebase/firestore';
import { data } from 'autoprefixer';


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



function MemberViewSavings() {

  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {

    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')

  }, [])

  const tt=localStorage.getItem('memberEmail');
  const oo=localStorage.getItem('AdminId');
  const ll=localStorage.getItem('groupName');
  const kk=localStorage.getItem('Period');

  var Members = [];
  window.onload =getdata();

 const [getting,setSetting]=useState(false); 


  async function getdata(){
   
    const querySnapshot =await getDocs(collection(db,`Admin/${oo}/${ll}/${kk}/Members/${tt}/MonthlySavings`));
    
 var n=0;
     querySnapshot.forEach(doc=>{
          // setSetting(true);
           Members.push({month:(doc.id),amount:(doc.data().Rs)});
  
        });

        
        console.log(getting);

      
        AddAllItemsToTable(Members);
        
        
      }


      function AddAllItemsToTable(Members){


        var monthNames = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
      
       var l;
       var pp;
        Members.forEach(e=>{
    
          pp=e.month.slice(5, 7);;
            console.log(parseInt(pp));
         
             l= monthNames[(parseInt(pp))-1];
             
             
             if(Members.length<table.rows.length){
              for(var t=0;t<=table.rows.length;t++){

                console.log("------------------------"+table.rows[t].cells[0].innerHTML);
                     }

             }
        
        
            
         AddItemToTable(l,e.amount);

          console.log(l);
          console.log(e.amount);
      
        });
      
       
       }

      var stdNo=0;

var table = document.getElementById("table");
var srNo=0;
 function AddItemToTable(id,value){

      console.log(id);
      console.log(value);

        var row = table.insertRow(-1);
  		  var cell1 = row.insertCell(0);
  		  var cell2 = row.insertCell(1); 
        var cell3 = row.insertCell(2); 
      
        cell1.innerHTML=srNo++;
        cell2.innerHTML=id;
        cell3.innerHTML=value;

      

 }


 const navigate=useNavigate();

 const handleSubmition=(e)=>{
   e.preventDefault(); 
     
   localStorage.removeItem('memberEmail');
   localStorage.removeItem('AdminId');
   localStorage.removeItem('groupName');
   localStorage.removeItem('Period');
   navigate("/Login");
    
};



return(
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
                                <a class="nav-link"><Link to={'/MemberHome'}>{t('home')}</Link> </a>
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
                    <a class="navbar-brand me-auto" href="#"><Link to={'/MemberHome'}><img src={logo} className="App-logo" alt="logo" /></Link> </a>
                    </div>
              <div class="col-xl-1 col-lg-2 col-sm-2 col-3" >
                   
                    <li class="nav-item dropdown   me-auto">
                      <a class="nav-link dropdown-toggle bg-dark" href="#" role="button" data-bs-toggle="dropdown"> <img src={profile} className="profile"  alt="logo" /></a>
                      <ul class="dropdown-menu ">
                              <li><Link class="dropdown-item" to={'/MemberProfilePage'}>{t('profile')}</Link> </li>
                              
                              <li><a class="dropdown-item" onClick={handleSubmition}>{t('log_out')}</a></li>
                    </ul>
                  </li>
              </div>
        </div>
            
          
            <div class="container" >
            <h1>{t('my_savings')}</h1>
        
        
          <div class="table-responsive">
    <table class="table table-bordered" id='table'>

      
      <thead>
        <tr id='heading'>
        <th>{t('sr_no')}</th>
        <th>{t('month')}</th>
          <th>{t('amount')}</th>

       
        </tr>
      </thead>
      <tbody id='tbody1'>
  
    
      </tbody>
    </table>
  </div>
      

        </div>





  </>
    

  );
}

export default MemberViewSavings;