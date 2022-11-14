import React, { useEffect,useState } from 'react';
import './ViewLoanRequest.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs, doc,query, where,collection,updateDoc, setDoc} from 'firebase/firestore';

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


function ViewLoanRequest(props) {


  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
  }, [currentLanguage])

  
   
  var MyDate = new Date();
var rr=(MyDate.getMonth()+1);        
 console.log(props.fdate);
  var  calculate= (((parseInt((props.fdate).slice(5,7)))-rr) + (((parseInt((props.fdate).slice(0,4))) -MyDate.getFullYear())*12));

  console.log(calculate);
var tds=[];

// useEffect(()=>{
//   getdata();
//  setStart(true);
// },[]);
window.onload =getdata();
//getdata();
//console.log(props.mmuid, props.ggg, props.ddd);

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

                      //console.log(Members);
             
             console.log(props.intres);
              for(var k=0;k<Memails.length;k++){//to get the list of emails who has same date//////////
                    
                const Snapshot = await getDocs(collection(db,`Admin/${props.mmuid}/${props.ggg}/${props.ddd}/Members/${Memails[k]}/Loan/`));
               // h.push({email:Memails[k]});   
                Snapshot.forEach(doc=>{
                        //console.log('hi');
                        //data.push(doc.id,doc.data().Rs);
                        if(doc.data().loanGrant===false){
                          console.log(doc.id);
                          data.push({name:Members[k],email:Memails[k],date:(doc.id),amount:(doc.data().Laon_Amount),witness:(doc.data().Witness_Email)});
                        }
                   
  
                      });

                
           }
           console.log(data);
           //console.log(doo);
            // localStorage.setItem('davor',JSON.stringify(data));
            // h=localStorage.getItem(JSON.parse('davor'));
            AddAllItemsToTable(data);
    }

   
///////////////////////////////////////////////////////////////////////////

var stdNo=0;

var table = document.getElementById("table");
 function AddItemToTable(Name,Email,Date,Amount,Witness){

  var tBox = document.createElement('input');

  tBox.setAttribute('type', 'checkbox');
  tBox.setAttribute('Class', 'check');




        var row = table.insertRow(-1);
  		  var cell1 = row.insertCell(0);
  		  var cell2 = row.insertCell(1); 
        var cell3 = row.insertCell(2); 
        var cell4 = row.insertCell(3); 
        var cell5 = row.insertCell(4); 
        var cell6 = row.insertCell(5); 
        var cell7 = row.insertCell(6); 

        cell1.innerHTML=++stdNo;
        cell2.innerHTML=Name;
        cell3.innerHTML=Email;
        cell4.innerHTML=Witness;
        cell5.innerHTML=Date;
        cell6.innerHTML=Amount;
        cell7.appendChild(tBox);

 }






 function AddAllItemsToTable(Members){
  
console.log('hii');
  var pp = document.createElement('td');
  Members.forEach(e=>{

    for(var d=0;d<table.rows.length;d++){
      console.log(table.rows[d].cells[2].innerHTML);

      if(table.rows[d].cells[2].innerHTML==e.email){
        table.deleteRow(d);
      }
    }

    console.log(e.name,e.email,e.date,e.amount);
    AddItemToTable(e.name,e.email,e.date,e.amount,e.witness);
  
    
  });



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
                   AddSavings(table.rows[i+1].cells[2].innerHTML,table.rows[i+1].cells[4].innerHTML,table.rows[i+1].cells[5].innerHTML);
                   table.deleteRow(i+1);
             }
         }
     }
///////////////////////////////////////////////////

 async function AddSavings(emls,dids,eee){

  var a=0;
var b=0;
     
  let pt='Admin/'+props.mmuid+'/'+props.ggg;
  const coll = doc( db , pt,`${props.ddd}`);
  const docSnap = await getDoc(coll);

  if (docSnap.exists()) {
    a=(docSnap.data().late_fee)
   b=(docSnap.data().loan_interest_value)
  }

  else{
    console.log('not found');
  }

      console.log(eee);
      console.log(calculate);
        console.log(emls,dids);

          const washingtonRef = doc(db, `Admin/${props.mmuid}/${props.ggg}/${props.ddd}/Members/${emls}/Loan/${dids}`);

          var overallInterest=(eee*(b/100)*(calculate/12));
          var totalAmount= parseFloat(overallInterest)+parseFloat(eee) ;
          var MonthlyInstallmentWithInterest=totalAmount/parseFloat(calculate);
          var InterestPerMonth=parseFloat(overallInterest)/parseFloat(calculate);
          setDoc(washingtonRef, {
          loanGrant: true,
          Final_Amount_with_Interest:totalAmount.toFixed( 2 ),
          Monthly_Installement:MonthlyInstallmentWithInterest.toFixed( 2 ),
          Monthly_Interest:InterestPerMonth.toFixed( 2 )
        },{ merge: true });

  
  } 
//////////////////////////////

  

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
        <h1>{t('view_loan_requests')}</h1>
        
        
          <div class="table-responsive">
    <table class="table table-bordered" id='table'>

      
      <thead>
        <tr id='heading'>
        <th>{t('sr_no')}</th>
          <th>{t('name')}</th>
          <th>{t('email')}</th>
          <th>{t('witness_email')}</th>
          <th>{t('date')}</th>
          <th>{t('amount')}</th>
          <th>{t('grant_loan')}</th>
        </tr>
      </thead>
      <tbody id='tbody1'>
  
      
      </tbody>
    </table>
  </div>
      
  <button type="submit" class="btn btn-primary" onClick={handleSubmition} >{t('grant_loan')}</button>
       
        </div>

            
           
<footer class="container-fluid bg-dark" id="inffo">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default ViewLoanRequest;

