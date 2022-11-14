import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { collection ,getDoc,setDoc, doc,addDoc} from 'firebase/firestore';
import { auth,db} from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import './AddBank.css'

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


function AddBank(props) {



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


////////////////////////

const [serrmsg,setSErrmsg]=useState('');
const [Bname, setBname]=useState('');
const [Bbranch, setBbranch]=useState('');
const [Baccount, setBaccount]=useState('');
const [Bifsc, setBifsc]=useState('');

const navigate=useNavigate();

const [submitButtonDisable, setSubmitButtonDisable]=useState(false);

console.log(props.ssuid+'----------'+props.sggg);

var c;


const zz =localStorage.getItem('setgroup');



const handleSubmition=(e)=>{
  e.preventDefault();

  if(!Bname || !Bbranch || !Baccount || !Bifsc ){
    setSErrmsg("Fill all the fields");
    return;
  }

  if(Baccount.length!=15){
              
    alert('Account number should 11 digits');
     return; 
   }

   if(Bifsc.length!=11){
          
    alert('ifsc lenght should be 11');
     return; 
   }
   
  setSErrmsg("");


  setSubmitButtonDisable(true);

  ////////////////////////////////// set data /////////////////////////////////////////////////////


  const collRefff = doc( db ,`/Admin/${props.ssuid}/${zz}`,`Bank`);
  setDoc( collRefff , {
   Bank_Name:Bname,
   Branch:Bbranch,
   Account_Number:Baccount,
   IFSC_code:Bifsc
  });

  navigate("/");
}





  return (
    <>
            <div class="container bg-primary gradient-custom-2 ">
            <p>
            <h1>{t('bank_info')}</h1>
          <h3>{t('add_bank')}</h3>
          
          <center >
          <form class=" col-sm-6">

          <div class="mb-3">
                    <label for="exampleInputBank" class="form-label">{t('bank_name')}</label>
                    <input type="bank" class="form-control" id="exampleInputBank" aria-describedby="bankHelp" onChange={e=>setBname(e.target.value)} required/>
                    <div id="bankHelp" class="form-text"></div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputBranch" class="form-label">{t('branch')}</label>
                    <input type="branch" class="form-control" id="exampleInputBranch" onChange={e=>setBbranch(e.target.value)} required/>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputAccount" class="form-label">{t('ac_no')}</label>
                    <input type="account" class="form-control" id="exampleInputAccount" onChange={e=>setBaccount(e.target.value)} required/>
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputIfsc" class="form-label">{t('ifsc_code')}</label>
                    <input type="ifsc" class="form-control" id="exampleInputIfsc" onChange={e=>setBifsc(e.target.value)} required/>
                  </div>

                  <div class="col-md-3 mb-3">
                    <b className="err"> {serrmsg} </b>
              
                </div>
                 
                  <button type="submit" class="btn btn-primary" onClick={handleSubmition} disabled={submitButtonDisable}>{t('add_bank')}</button>
                </form>
                </center>
        </p>
            
            </div>



</>
    

  );
}

export default AddBank;






























