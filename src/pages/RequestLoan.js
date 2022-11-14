import React,{useState,useEffect} from 'react';
import './RequestLoan.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { auth,db} from '../Firebase';
import { collection ,addDoc,setDoc, doc,getDocs} from 'firebase/firestore';



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




function RequestLoan(props) {


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

const navigate=useNavigate();


 
  const [WitnessEmail, setWitnessEmail]=useState('');
  const [LaonAmount, setLaonAmount]=useState('');
  const [check,setCheck] =useState(false);
  
  const [serrmsg,setAErrmsg]=useState('');

  const tt=localStorage.getItem('memberEmail');
  const oo=localStorage.getItem('AdminId');
  const ll=localStorage.getItem('groupName');
  const kk=localStorage.getItem('Period');
  const nn=localStorage.getItem('MemberName');
  var witnees = [];



  useEffect(()=>{
    getdata();
   

  },[WitnessEmail]);


 // getdata();
  async function getdata(){
    const Snapshot = await getDocs(collection(db,`Admin/${oo}/${ll}/${kk}/Members/`));
    
          Snapshot.forEach(doc=>{
         
      console.log(doc.id);
      witnees.push({email:doc.id,name:doc.data().name});
  
   });

 
  }
  const nav=useNavigate();

  const Submition=(e)=>{
    e.preventDefault(); 
      
    localStorage.removeItem('memberEmail');
    localStorage.removeItem('AdminId');
    localStorage.removeItem('groupName');
    localStorage.removeItem('Period');
    nav("/Login");
     
 };


  const handleSubmition=(e)=>{
    e.preventDefault();
  
    if(!WitnessEmail || !LaonAmount ){
        setAErrmsg("Fill all the fields");
        return;
   }

   for(var r=0;r<witnees.length;r++){

    if(witnees[r].email!==WitnessEmail ){
     setAErrmsg("witness with that email is not in group");
    setCheck(true);
      

   }
   else{

    const collRefff = doc( db ,`/Admin/${oo}/${ll}/${kk}/Members/${tt}/Loan`,`${props.mdate}`);
    setDoc( collRefff , {
      My_Name:nn,
      My_Email:tt,
      Witness_Email:WitnessEmail,
      Laon_Amount:LaonAmount,
      loanGrant:false
    });

    navigate("/MemberHome");
   }
  }

    setAErrmsg("");
  ////////////////////////////////////////////////////////////////////////////////////////////////

  
  ////////////////////////////////// set data /////////////////////////////////////////////////////
  
 
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
                              
                              <li><a class="dropdown-item" onClick={Submition}>{t('log_out')}</a></li>
                    </ul>
                  </li>
              </div>
        </div>
            
        
            <div className="formContainer" class="container bg-primary gradient-custom-2 ">

            <p>
            <center >
            <h1>Member Loan</h1>
            <h3>Submit Details</h3><br/>          
            
            <form className="requestLoanForm" class=" col-sm-6">

                  <div class="mb-3">
                    <label for="exampleInputName" class="form-label">{t('your_name')}</label>
                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp" value={nn} disabled/>
                    <div id="nameHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputMemberID" class="form-label">{t('your_email')}</label>
                    <input type="email" class="form-control" id="exampleInputMemberID" aria-describedby="memberIDHelp" value={tt} disabled/>
                    <div id="memberIDHelp" class="form-text"></div>
                  </div>
                 
                  <div class="mb-3">
                    <label for="exampleInputWitnessMemID" class="form-label">{t('witness_email')}</label>
                    <input type="email" class="form-control" id="exampleInputWitnessMemID" aria-describedby="witnessMemIDHelp" onChange={e=>setWitnessEmail(e.target.value)} required/>
                    <div id="witnessMemIDHelp" class="form-text"></div>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputLoanAmount" class="form-label">{t('loan_amount')}</label>
                    <input type="text" class="form-control" id="exampleInputLoanAmount" aria-describedby="loanAmountHelp" onChange={e=>setLaonAmount(e.target.value)} required/>
                    <div id="mnumberHelp" class="form-text"></div>
                  </div>

                  <h4> {serrmsg}</h4>

                  <button type="submit" class="btn btn-primary" onClick={handleSubmition}>{t('request_loan')}</button><br/><br/>
                </form>
                </center>
              </p>
            
            </div>


</>
    

  );
}

export default RequestLoan;