import React, { useEffect,useState } from 'react';
import './ShgProfilePage.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs, doc,query, where,collection} from 'firebase/firestore';
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




function ShgProfilePage(props) {




  const [ssname,setSsname]=useState('');
  const [sStartdate,setStartDate]=useState('');  
  const [sEndDate,setEndDate]=useState('');
  const [sPincode,setPincode]=useState('');
  const [sState,setSate]=useState('');
  const [sVillage,setVillage]=useState('');
  const [sNumbeofMembers,setNumberofMembers]=useState('');
  const [sPeriod,setPeriod]=useState('');


  const [useName,setUseName]=useState("");
  const [useuid,setUid]=useState(""); 

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
     

    async function getdata(){

           const docRef = doc(db, "Admin/", (props.puid));
              const docSnap = await getDoc(docRef);
              console.log(props.puid);
              if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().shg);
              console.log(props.date);
              setUseName(docSnap.data().shg);

              let a='Admin/'+props.puid+'/'+docSnap.data().shg;
              console.log(props.puid);
              const q = query(collection(db,a), where(`end_date`, ">=", props.date));
        
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                                setSsname(doc.data().name);
                                setEndDate(doc.data().end_date);
                                setStartDate(doc.data().start_date);
                                setPincode(doc.data().pincode);
                                setPeriod(doc.data().period_number);
                                setSate(doc.data().state);
                                setNumberofMembers(doc.data().No_of_Date);
                                setVillage(doc.data().village);
                          });
              
              
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }

        }
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////
     const navigate=useNavigate();

     const handleSubmition=(e)=>{
       e.preventDefault(); 
         
       const auth = getAuth();
           signOut(auth).then(() => {
     // Sign-out successful.
           navigate("/Login");
           localStorage.removeItem('memberEmail');
           localStorage.removeItem('AdminId');
           localStorage.removeItem('groupName');
           localStorage.removeItem('Period');
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

        
        
        <div class="col-xl-6 col-lg-6 col-sm-6 col-6 bg-primary" >
           
        <h4 className="gg">{t('group_name')} :</h4>
          <h4 className="gg">{t('start_date')} :</h4>
          <h4 className="gg">{t('end_date')} : </h4>
          <h4 className="gg">{t('pincode')} :</h4>
          <h4 className="gg">{t('village_name')} :</h4>
          <h4 className="gg">{t('state')} : </h4>
          <h4 className="gg">{t('period_no')} : </h4>
          <h4 className="gg" id='lastbtn'>{t('max_members')} :</h4>
       

          <button type="button" class="btn btn-primary" id='upbtn'><Link to={'/UpdateSHG'}>{t('update_profile')}</Link> </button>
         
        </div>

        <div class="col-xl-6 col-lg-6 col-sm-6 col-6 bg-primary" >
     
          <h4 className="aa">{ssname}</h4>
          <h4 className="aa">{sStartdate}</h4>
          <h4 className="aa">{sEndDate}</h4>
          <h4 className="aa">{sPincode}</h4>
          <h4 className="aa">{sVillage}</h4>
          <h4 className="aa">{sState}</h4>
          <h4 className="aa">{sPeriod}{useuid}</h4>
          <h4 className="aa">{sNumbeofMembers}</h4>
   
         
   
        </div>

       </div>
        </center>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</>
    

  );
}

export default ShgProfilePage;

