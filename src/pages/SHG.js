import React, { useEffect,useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './SHG.css';

import profile from './profile.jpeg';
import { auth,db} from '../Firebase';

import { Link, useNavigate } from 'react-router-dom';
import { collection ,getDoc,setDoc, doc} from 'firebase/firestore';


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


function SHG(props) {
 
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
  }, [currentLanguage, t])



  


  const [ssdate,setSSDate]=useState('');
  const [sedate,setSEDate]=useState('');
  const [svillage,setVillage]=useState('');
  const [sstate,setState]=useState('');
  const [spin,setSpin]=useState('');
  const [snfMember,setSnfMember]=useState('');
  const [period,setPnumber]=useState('');
  const [shg,setShg]=useState('');

  const [serrmsg,setSErrmsg]=useState('');

  const [subitButtonDisable,setSubmitButtonDisable]=useState(false);

  const navigate=useNavigate();

  useEffect(()=>{
    getdata();
    
  },[])


  ///////////////////////////////////////////////////////////////////////////////////////
async function getdata(){
  console.log('hello');  
  const docRef = doc(db, "Admin", (props.sid));
  const docSnap = await getDoc(docRef);

  
  if (docSnap.exists()) {
        setShg(docSnap.data().shg);
        localStorage.setItem('setgroup',docSnap.data().shg);
  
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

}

const handleSubmition=(e)=>{

 
  e.preventDefault(); 

  console.log(props.sid);

    if( !ssdate || !sedate || !svillage || !sstate || !spin || !snfMember || !period){
         setSErrmsg("Fill All The Fields");
         return;
    }
    if(spin.length!=6){
              
      alert('pin number should 6 digits');
       return; 
     }
    setSErrmsg("");

    setSubmitButtonDisable(true);
      ////////////////////////////////////////////////////////////////////////////////////  


  
    const collRefff = doc( db , `/Admin/${props.sid}/${shg}/`,`${period}`);
     setDoc( collRefff , {name: shg,
      start_date: ssdate,
      end_date: sedate,
      village: svillage,
      state: sstate,
      pincode: spin,
      No_of_Date :snfMember,
      period_number:period});

    
      
      navigate("/AddBank");
      
 
//////////////////////////////////////////////////////////
    

}

  return (
    <>

            <div class="container bg-primary gradient-custom-2 ">
            <p>
          <h1>SHG Home Group</h1>
          <h3>ADD SHG</h3>
          </p>
          <center >
          <form class=" col-sm-6">

          <div class="mb-3">
                    <label for="exampleInputShgName" class="form-label">{t('group_name')}</label>
                    <input type="name" class="form-control" id="exampleInptShgName" value={shg} disabled aria-describedby="ShgHelp" required/>
             
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputStartDate" class="form-label">{t('start_date')}</label>
                    <input type="date" class="form-control" id="exampleInputStartDate" aria-describedby="joinDateHelp" onChange={e=>setSSDate(e.target.value)} required/>
               
                  </div>
                  
                  <div class="mb-3">
                    <label for="exampleInputEndDate" class="form-label">{t('end_date')}</label>
                    <input type="date" class="form-control" id="exampleInputEndDate" aria-describedby="endDateHelp" onChange={e=>setSEDate(e.target.value)} required/>
          
                  </div>
                 
                  <div class="mb-3">
                    <label for="exampleInputVillage" class="form-label">{t('village_name')}</label>
                    <input type="text" class="form-control" id="exampleInputVillage" aria-describedby="villageHelp" onChange={e=>setVillage(e.target.value)} required/>
            
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputState" class="form-label">{t('state')}</label>
                    <input type="state" class="form-control" id="exampleInputState" aria-describedby="stateHelp" onChange={e=>setState(e.target.value)} required/>
                   
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPincode" class="form-label">{t('pincode')}</label>
                    <input type="addhar" class="form-control" id="exampleInputPincode" aria-describedby="pincodeHelp" onChange={e=>setSpin(e.target.value)} required/>
                
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPincode" class="form-label">{t('max_members')}</label>
                    <input type="addhar" class="form-control" id="exampleAddMember" aria-describedby="pincodeHelp" onChange={e=>setSnfMember(e.target.value)} required/>
        
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPincode" class="form-label">{t('period_no')}</label>
                    <input type="text" class="form-control" id="examplePnumber" aria-describedby="pincodeHelp" onChange={e=>setPnumber(e.target.value)} required/>
        
                  </div>
                  <div class="col-md-3 mb-3">
                    <b className="err"> {serrmsg} </b>
              
                </div>

                  <button type="submit" onClick={handleSubmition}   class="btn btn-primary" id='shgbtn'>{t('create')}</button>
                </form>
                </center>
            
            
            </div>



</>
    

  );
}

export default SHG;
