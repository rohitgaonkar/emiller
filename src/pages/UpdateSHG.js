import React, { useEffect,useState } from 'react';
import './UpdateSHG.css';
import 'bootstrap/dist/css/bootstrap.css';
import { auth,db} from '../Firebase';
import logo from './logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { getDoc,getDocs,setDoc ,doc,query, where,collection} from 'firebase/firestore';
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


function UpdateSHG(props) {

  const [ssname,setSsname]=useState('');
  const [sStartdate,setStartDate]=useState('');  
  const [sEndDate,setEndDate]=useState('');
  const [sPincode,setPincode]=useState('');
  const [sState,setSate]=useState('');
  const [sVillage,setVillage]=useState('');
  const [sNumbeofMembers,setNumberofMembers]=useState('');
  const [sPeriod,setPeriod]=useState('');
  const [PresentYear,setTodayYear]=useState('');
  const [cutyear,setCutYear]=useState('');
  const [result,setResult]=useState('');

  const currentLanguageCode = cookies.get('i18nextLng') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t , i18n } = useTranslation("common")
  const [lang, setlang] = useState('en')


  useEffect(() => {
    getdata();
    document.body.dir = currentLanguage.dir || 'ltr'
    setlang(cookies.get('i18nextLng'))
    i18next.changeLanguage(lang)
    document.title = t('app_title')
  }, [currentLanguage, t])

  const [useName,setUseName]=useState("");
  const [useuid,setUid]=useState(""); 
  const grp=localStorage.getItem('groupName');


 var larg=0;    

 async function getdata(){

      console.log(props.ggg);
      var a='Admin/'+props.puid+'/'+grp+'/';
      const shot = await getDocs(collection(db, a));
      shot.forEach((doc) => {
        var g=doc.id;
        console.log(doc.id);
        if(doc.id!='Bank'){
          console.log(doc.id);

            if(larg<= doc.id){
              larg=doc.id;
              console.log(larg);
            }
        }
      
      });

            const Ref = doc(db, `Admin/${props.puid}/${grp}/`, (larg));
            const Snap = await getDoc(Ref);
            if (Snap.exists()) {

              console.log(Snap.data());
              setSsname(Snap.data().name);
              setVillage(Snap.data().village);
              setPincode(Snap.data().pincode);
            
              setSate(Snap.data().state);


            }
            else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }



          

   }
////////////////////////set data///////////////////////////////////////////////////
function Submition(){
 

  const collRefff = doc( db ,`/Admin/${props.puid}/${grp}`,`${sPeriod}`);

  setDoc( collRefff , {name: ssname,
   start_date: sStartdate,
   end_date: sEndDate,
   village: sVillage,
   state: sState,
   pincode: sPincode,
   No_of_Date :sNumbeofMembers,
   period_number:sPeriod});

   navigate('/ShgProfilePage');

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
    <div className='qq'>
    
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
                                <a class="nav-link" href="#"><Link class="nav-link" to={'/ShgProfilePage'}>{t('shg')}</Link></a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" ><Link to={'/'}>{t('home')}</Link></a>
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
                    <a class="navbar-brand me-auto"><Link to={'/'}><img src={logo} className="App-logo" alt="logo" /></Link></a>
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

        <div class="col-xl-2 col-lg- col-sm-2 col-2 bg-primary" >
          
          
         </div>
        
        
        <div class="col-xl-5 col-lg-5 col-sm-5 col-5 bg-primary" >
           
          <h4 className="gg">{t('group_name')} :</h4>
          <h4 className="gg">{t('start_date')} :</h4>
          <h4 className="gg">{t('end_date')} : </h4>
          <h4 className="gg">{t('pincode')} :</h4>
          <h4 className="gg">{t('village')} :</h4>
          <h4 className="gg">{t('state')} :</h4>
          <h4 className="gg">{t('period_no')} :</h4>
          <h4 className="gg" id='lastbtn'>{t('no_of_members')} :</h4>
       

          <button type="button" class="btn btn-primary" id='upbtn' onClick={Submition}>{t('update')}</button>
         
        </div>

        <div class="col-xl-3 col-lg-3 col-sm-3 col-3 bg-primary" >

        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" value={ssname} disabled/>
        <input type="date" class="form-control" className="aa" aria-describedby="joinDateHelp" onChange={e=>setStartDate(e.target.value)} required/><br></br>
        <input type="date" class="form-control"  className="aa" aria-describedby="joinDateHelp" onChange={e=>setEndDate(e.target.value)} required/>
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={sPincode} disabled/>
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={sVillage} disabled/>
        <input type="text" class="form-control"  className="aa" aria-describedby="joinDateHelp" value={sState} disabled/>
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" onChange={e=>setPeriod(e.target.value)} required/>
        <input type="text" class="form-control" className="aa" aria-describedby="joinDateHelp" onChange={e=>setNumberofMembers(e.target.value)} required/>

   
         
   
        </div>

        <div class="col-xl-2 col-lg- col-sm-2 col-2 bg-primary" >

          </div>

       </div>
        </center>

<footer class="col-12 bg-dark" id="info">
<Link to={'/Help'}><h4>Help</h4> </Link>
</footer>

</div>
    

  );
}

export default UpdateSHG;

