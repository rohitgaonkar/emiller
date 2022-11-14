import React, { useEffect,useState,memo,useCallback } from 'react';
import './ViewActiveLoans.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import ReactTable from "react-table";  
import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs, doc,query, where,collection,getFirestore,onSnapshot,addDoc,setDoc,} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import profile from './profile.jpeg';

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

import { assert, async } from '@firebase/util';


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


function ViewActiveLoans(props) {


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
const price=localStorage.getItem('Rs');
const savingdate=localStorage.getItem('sdate');
const latef=localStorage.getItem('late');
const lastDateInstallment = localStorage.getItem('Idate');
const Interest =localStorage.getItem('Intrst');
const finalDate =localStorage.getItem('finaldate');

console.log(lastDateInstallment);
  var MyDate = new Date();
 
  const todate=MyDate.getFullYear()+'-'+(MyDate.getMonth()+1)+'-'+MyDate.getDate();
  console.log(todate);

  const table = document.getElementById("table");

  const [starting,setStarting] = useState(false);
  //const [starting2,setStarting2] = useState(false);

window.onload=getdata();

var data=[];
let arr = [];   
var Memails=[];
                 
var Members=[];
// if(starting!=true){

//   getdata();
// } 


    async function getdata(){
    
 
      const querySnapshot =await getDocs(collection(db,`Admin/${zz}/${grp}/${ddid}/Members`));
           
                  querySnapshot.forEach(doc=>{
                  
                    Memails.push(doc.data().email);
            
                    Members.push(doc.data().name);
                    runonlyonce(doc.data().email,doc.data().name);
                
                  });
              
                  console.log(Memails);     
                 
        }




     async  function runonlyonce(Memails,Members){

            const Snapshot = await getDocs(collection(db,`Admin/${zz}/${grp}/${ddid}/Members/${Memails}/Loan/`));
               Snapshot.forEach(doc=>{
                
                    if(doc.data().loanGrant===true){
                 
                          getAllPayedInstallment(doc.id,Members,Memails,doc.data().Laon_Amount,doc.data().Final_Amount_with_Interest,doc.data().Monthly_Installement,doc.data().Monthly_Interest);

                          }
              
                    });

              
        }

   async function getAllPayedInstallment(id,na,em,amount,famount,install,monthlyInt){
                     var co=0;
                     var p=0;
                     var h=0;
                     var j=2022-7-15;
       
         
                  const querySnapshot = await getDocs(collection(db, `Admin/${zz}/${grp}/${ddid}/Members/${em}/Loan/${id}/Installment/`));
             
                  querySnapshot.forEach((doc) => {
              
                          co=co+parseFloat(doc.data().Amount);
                     
                  });

                  console.log(data);
          
                    p=famount-co;
                    data.push({id:data.length,name:na,email:em,date:id,amount:amount,OverallAmount:famount,MonthlyInstallemt:install,MonthlyInterest:monthlyInt,Remaing_Amount:p});
                    h=0;
                  
                  
               AddAllItemsToTable(data);
            

         }
       
         
///////////////////////////////////////////////////////////////////////////

function AddAllItemsToTable(Members){

  console.log(table.rows.length);
  stdNo=0;
  Members.forEach(e=>{
    for(var d=0;d<table.rows.length;d++){
      console.log(table.rows[d].cells[2].innerHTML);

      if(table.rows[d].cells[2].innerHTML==e.email){
        table.deleteRow(d);
      }
    }

    console.log(e.name,e.email,e.date,e.amount);

    if(e.Remaing_Amount!=0){
      AddItemToTable(e.name,e.email,e.date,e.amount,e.OverallAmount,e.MonthlyInstallemt,e.MonthlyInterest,e.Remaing_Amount);
    }
 
  });

      }

var stdNo=0;

 function AddItemToTable(Name,Email,Date,Amount,oveall,monthly,intres,reaming){


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
   
   
        
        cell1.innerHTML=++stdNo;
        cell2.innerHTML=Name;
        cell3.innerHTML=Email;
        cell4.innerHTML=Date;
        cell5.innerHTML=Amount;
        cell6.innerHTML=oveall;
        cell7.innerHTML=intres;
        cell8.innerHTML=monthly;
        cell9.innerHTML=reaming;
  
   
     
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
                console.log(table.rows[i+1].cells[2].innerHTML);
                    ViewActiveLoans(table.rows[i+1].cells[2].innerHTML,table.rows[i+1].cells[3].innerHTML,table.rows[i+1].cells[7].innerHTML);
              }
          }
      }

  
    
///////////////////////////////////////////////////
  function ViewActiveLoans(ooo,id,amount){



   // console.log(ooo);
    let pth='Admin/'+zz+'/'+grp+'/'+ddid+'/'+'Members'+'/'+ooo+'/'+'Loan/'+id+'/Installment/';
    console.log(pth);
    const collRef = doc( db , pth,`${todate}`);

          if(MyDate.getDate()==lastDateInstallment){
            setDoc( collRef , { Amount:parseInt(amount)});

          }

          else if(lastDateInstallment < MyDate.getDate()){
            setDoc( collRef , { Amount:amount,latefee:latef });
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
        <h1>{t('view_active_loans')}</h1>
             
          <div class="table-responsive">
    <table class="table table-bordered" id='table'>
      <thead>
        <tr>
        <th>{t('sr_no')}</th>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('date')}</th>
          <th>{t('loan_amount')}</th>
          <th>{t('loan_paying_amount')}</th>
          <th>{t('monthly_interest')}</th>
          <th>{t('monthly_installment')}</th>
          <th>{t('remaining_amount')}</th>
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

export default memo (ViewActiveLoans);

