import React, { useEffect,useState } from 'react';
import './ViewSavings.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import ReactTable from "react-table";
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

function ViewSavings(props) {

  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
   // deleteMe();
  // table.rows[0].deleteCell(table.rows[0].cells.length);
  }, [currentLanguage])


  window.onload =getdata();

    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var tds=[];

    async function getdata(){

              const querySnapshot =await getDocs(collection(db,`Admin/${props.mmuid}/${props.ggg}/${props.ddd}/Members`));
                  var Members = [];
                  var Memails=[];
                  var data=[];
                  var h=[];
                   querySnapshot.forEach(doc=>{

                    Members.push(doc.data().name);
                    Memails.push(doc.data().email);

                      });

                      
             
              var gg;
              for(var k=0;k<Memails.length;k++){//to get the list of emails who has same date//////////
                    
                const Snapshot = await getDocs(collection(db,`Admin/${props.mmuid}/${props.ggg}/${props.ddd}/Members/${Memails[k]}/MonthlySavings`));
                h.push({email:Memails[k]});   
                Snapshot.forEach(doc=>{

                        data.push(doc.id,doc.data().Rs);
  
                      });

                      h[k].values=data;
                      h[k].name=Members[k]
                      data=[];

           }
    
            AddAllItemsToTable(h);
    }

   
///////////////////////////////////////////////////////////////////////////

var stdNo=0;

var table = document.getElementById("table");
 function AddItemToTable(values,Email,Name){

 
  var yy = document.createElement('td');


        var row = table.insertRow(-1);
  		  var cell1 = row.insertCell(0);
  		  var cell2 = row.insertCell(1); 
        var cell3 = row.insertCell(2); 

        cell1.innerHTML=++stdNo;
        cell2.innerHTML=Name;
        cell3.innerHTML=Email;

        for(var b=1;b<values.length;b++){
          yy=values[b];
          var x = row.insertCell(-1);
           x.innerHTML = yy;
          b++;
      }
  
 }



 console.log(tds);
var g=0;
var gg=[];
var hh = document.getElementById("heading");
 function AddAllItemsToTable(Members){



  var pp = document.createElement('td');
  Members.forEach(e=>{




    for(var d=0;d<table.rows.length;d++){
      console.log(table.rows[d].cells[2].innerHTML);
     
      if(table.rows[d].cells[2].innerHTML==e.email){
        table.deleteRow(d);
      }

    }
  
      if(g<e.values.length){
        g=e.values.length
        gg=(e.values);
        console.log(e.values);
      }
      
    AddItemToTable(e.values,e.email,e.name);

  });

  console.log(g);
  console.log(gg);
    for(var u=0;u<g;u++){
      pp=gg[u].slice(5, 7);;
      console.log(parseInt(pp));
      var xx = hh.insertCell(-1);
       xx.innerHTML = monthNames[(parseInt(pp))-1];
      u++;
    }
    var b=3+(g/2)
    console.log(b);

    deleteMe(b);
    if(b<=table.rows[0].cells.length){
      for(var d=b;d<table.rows[0].cells.length;d++){
        table.rows[0].deleteCell(d);
      }
    }
    
    console.log('+++++++++++++++++++++++'+table.rows[0].cells.length);

 }

function deleteMe(b){
  if(b<=table.rows[0].cells.length){
    for(var d=b;d<table.rows[0].cells.length;d++){
      table.rows[0].deleteCell(d);
    }
  }

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
        <h1>{t('savings_page')}</h1>
        
        
          <div class="table-responsive">
    <table class="table table-bordered" id='table'>

      
      <thead>
        <tr id='heading'>
        <th>{t('sr_no')}</th>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
       

    
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

export default ViewSavings;

