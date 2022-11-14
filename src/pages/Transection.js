
import React, { useEffect,useState }  from "react";
import './Transection.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import { auth,db} from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';



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


 function Transection(props){


  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
  }, [currentLanguage,t])


    const [svillage,setVillage]=useState('');
    const [Joining, setJoining]=useState('');
    const [sel, setSel]=useState('');
    const table = document.getElementById("table");

    const [serrmsg,setAErrmsg]=useState('');
    const zz =localStorage.getItem('id');

const navigate=useNavigate();
console.log(props.usdd+'------------------------'+ props.usp);
const grp=localStorage.getItem('groupName');

window.onload =getdata();
      
 async function getdata(){

            const querySnapshot =await getDocs(collection(db,`Admin/${props.usdd}/${props.usp}/Bank/Transections/`));
              
                var Memails=[];
          
                var xx=[];
                querySnapshot.forEach(doc=>{
                
                  Memails.push({date:doc.id,transection:doc.data().transection,Amount:doc.data().amount});//to get all the emails
                  
              
                });
            
                console.log(Memails);
  
      

            AddAllItemsToTable(Memails);
    
      }

      
///////////////////////////////////////////////////////////////////////////
function AddAllItemsToTable(Members){
    var stdNo=0;
 //tbody.innerHTML="";
 console.log('hiii');

 Members.forEach(e=>{
  for(var d=0;d<table.rows.length;d++){
    console.log(table.rows[d].cells[1].innerHTML);

    if(table.rows[d].cells[1].innerHTML==e.date){
      table.deleteRow(d);
    }
  }

   AddItemToTable(e.date,e.Amount,e.transection);
 
 });
}


var stdNo=0;




function AddItemToTable(Date,Transection,Amount){
    console.log('hellooo');

      var row = table.insertRow(-1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1); 
          var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);
 
      
      cell1.innerHTML=++stdNo;
      cell2.innerHTML=Date;
      cell3.innerHTML=Amount;
      cell4.innerHTML=Transection;
   
}


    
const handleSubmition=(e)=>{
        e.preventDefault();

        let amount = document.getElementById("amount").value;
        let options = document.getElementById("options").value;
        let  dating= document.getElementById("dating").value;

  console.log(amount+'-------------------'+options+'----------'+dating)
      
        if(!amount || !dating ){
            setAErrmsg("Fill all the fields");
            return;
       }
        setAErrmsg("");
   
      ////////////////////////////////// set data /////////////////////////////////////////////////////
      let pth= '/Admin/'+props.usdd+'/'+grp+'/Bank/Transections/';
      console.log(pth);
      const collRef = doc( db , pth,`${dating}`);
   setDoc( collRef ,{amount:amount,
            transection:options
        
      });
      
      navigate('/');
      
      
      }

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
      <h1>{t('transaction')}</h1>

         
        <div class="fluid-container">
            <div class='row'>
                    <div class="col-xl-2 col-lg-2 col-sm-2 col-3" >
                        <input type="text" class="form-control" id="amount" aria-describedby="villageHelp"  placeholder="Enter Amount" required/>
                    </div>

                    <div class="col-xl-2 col-lg-2 col-sm-2 col-3" >
                            <select class="form-select" id="options" name="sellist1"  required>
                            <option>withdraw</option>
                            <option>Deposit</option>  
                            </select>
                    </div>

                    <div class="col-xl-2 col-lg-2 col-sm-2 col-3" >
                    <input type="date" class="form-control" id="dating" aria-describedby="joinDateHelp"  required/>
                    </div>

                    <div class="col-xl-2 col-lg-2 col-sm-2 col-3" >
                        
                    </div>
                </div>
        </div>
        <h4> {serrmsg}</h4>
        <button type="submit" class="btn btn-primary" onClick={handleSubmition} >{t('submit')}</button>
        <div class="table-responsive">
  <table class="table table-bordered" id='table'>
    <thead>
      <tr>
      <th>{t('sr_no')}</th>
        <th>{t('date')}</th>
        <th>{t('transaction')}</th>
        <th>{t('amount')}</th>
       
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

</>);
}

export default Transection;