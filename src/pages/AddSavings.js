import React, { useEffect,useState,memo,useCallback } from 'react';
import './AddSavings.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import ReactTable from "react-table";  
import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs, doc,query, where,collection,getFirestore,onSnapshot,addDoc,setDoc,} from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import profile from './profile.jpeg';
import { First } from 'react-bootstrap/esm/PageItem';


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

function AddSavings(props) {


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


  var MyDate = new Date();
  console.log(MyDate.getDate());

  const table = document.getElementById("table");
  const [getdate,setDate]=useState('');
  const [getlenght,setLenght]=useState('');
  const [getee,setEE]=useState('');
  const [getnn,setNN]=useState('');

  const [MothlyPayingAmount, setMothlyPayingAmount]=useState('');
  const [SavingLastDate, setSavingLastDate]=useState('');


window.onload=getdata();

 
    async function getdata(){
      console.log(props.auid);

            
              const querySnapshot =await getDocs(collection(db,`Admin/${props.auid}/${props.agg}/${props.add}/Members`));
                
                  var Memails=[];
                  var Mids=[];
                  var latest=[];
                  var Members=[];
                  var Nmembers=[];
                  var xx=[];
                  querySnapshot.forEach(doc=>{
                  
                    Memails.push(doc.data().email);//to get all the emails
                    xx.push(doc.data());
                
                  });
              
                  console.log(Memails);
    
                 var n=(props.adate).slice(5,7);
                  for(var k=0;k<Memails.length;k++){//to get the list of emails who has same date//////////
                     const Snapshot = await getDocs(collection(db,`Admin/${props.auid}/${props.agg}/${props.add}/Members/${Memails[k]}/MonthlySavings`));
                        Snapshot.forEach(doc=>{
                             var d=doc.id.slice(5, 7);
                       
                            if(d==n){
                              Mids.push(Memails[k]);

                              }
                             

                           });

                }/////////////////
                console.log(Memails.length);
                console.log(Mids.length);

                const setA = new Set(Memails);
                const setB = new Set(Mids);

                for(var o=0;o<Memails.length;o++){
             
                  for(var p=0;p<Mids.length ;p++){
                  
                    if(Mids[p]===Memails[o]){

                        Memails[o]='';
                          }

                  }
                }

                   console.log(Mids);
              
                  console.log(xx);
                  console.log(Memails);
                 //Memails = [...new Set(Memails)];
                  var e=0;
                  //console.log(Memails);
                  for(var t=0;t<Memails.length;t++){
                    if(Memails[t]!==''){
                          Nmembers[e]=Memails[t];
                          e++;
                    }
                  }

                  console.log(Nmembers);
               for(var f=0;f<Nmembers.length;f++){
                    const querySnapshot =await getDocs(collection(db,`Admin/${props.auid}/${props.agg}/${props.add}/Members/`));

                             querySnapshot.forEach(doc=>{
                              var t=doc.data().email;
                    
                                if(t==Nmembers[f]){
                                  
                                         Members.push(doc.data());

                                    }

                                });

                             }

              AddAllItemsToTable(Members);
      
        }

        
///////////////////////////////////////////////////////////////////////////

function AddAllItemsToTable(Members){


  var x=Members.length;
   for(var i=0;i<x;i++){

    for(var d=0;d<table.rows.length;d++){
      console.log(table.rows[d].cells[2].innerHTML);

      if(table.rows[d].cells[2].innerHTML==Members[i].email){
        table.deleteRow(d);
      }
    }

               AddItemToTable(Members[i].name,Members[i].email);
         }

      }

var stdNo=0;




 function AddItemToTable(Name,Email){

  var tBox = document.createElement('input');

  tBox.setAttribute('type', 'checkbox');
  tBox.setAttribute('Class', 'check');

        var row = table.insertRow(-1);
  		  var cell1 = row.insertCell(0);
  		  var cell2 = row.insertCell(1); 
  		  var cell3 = row.insertCell(2);
  		  var cell4 = row.insertCell(3);
   
        
        cell1.innerHTML=++stdNo;
        cell2.innerHTML=Name;
        cell3.innerHTML=Email;
        cell4.appendChild(tBox);
     
 }





///////////////////////////////////////////////////
     const navigate=useNavigate();

     const handleSubmition=(e)=>{
       e.preventDefault(); 
    
         var myElements = document.querySelectorAll('.check');

         var c =table.rows.length;

          var i=0;
         for(var i=0;i<myElements.length;i++){
              if(myElements[i].checked==true){
                    AddSavings(table.rows[i+1].cells[2].innerHTML);
              }
          }
      }

  
    
///////////////////////////////////////////////////
async  function AddSavings(ooo){
var a=0;
var b=0;
     
  let pt='Admin/'+props.auid+'/'+props.agg;
  const coll = doc( db , pt,`${props.add}`);
  const docSnap = await getDoc(coll);

  if (docSnap.exists()) {
    a=(docSnap.data().late_fee)
   b=(docSnap.data().monthly_paying_amount)
  }

  else{
    console.log('not found');
  }
console.log("========"+a+"---------"+b);
    if(props.sdatel=='1'||'2'||'3'||'4'||'5'||'6'||'7'||'8'||'9'){
              var  fixits='0'+props.sdatel;

    }
    else{
      fixits=props.sdatel;
    }

   // console.log(ooo);
    let pth='Admin/'+props.auid+'/'+props.agg+'/'+props.add+'/'+'Members'+'/'+ooo+'/'+'MonthlySavings/';
    const collRef = doc( db , pth,`${props.adate}`);

          if(fixits==MyDate.getDate()){
            setDoc( collRef , { Rs:parseInt(b)});

          }

          else{
            setDoc( collRef , { Rs:parseInt(b)+parseInt(a) });
          }
     
     navigate('/');
    
    } 
    
  
   
////////////////////////////////////////////////////////////
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
        <tr>
          <th>{t('sr_no')}</th>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('select')}</th>
         
        </tr>
      </thead>
      <tbody id='tbody1'>
    
      </tbody>
    </table>
  </div>
     
       
  <button type="submit" class="btn btn-primary" onClick={handleSubmition} >{t('submit')}</button>
        </div>

              
             
                  

           
<footer class="container-fluid bg-dark" id="inffo">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default memo (AddSavings);

