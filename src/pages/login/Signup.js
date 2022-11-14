import logo from '../logo.png';
import './Signup.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from 'react';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { auth,db} from '../../Firebase';
import { async } from '@firebase/util';
import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc} from 'firebase/firestore';

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
  


function Signup() {



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


    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    const [repass,setRepass]=useState('');
    const [lname,setLname]=useState('');
    const [addr,setAddr]=useState('');
    const [stat,setStat]=useState('');
    const [city,setCity]=useState('');
    const [pin,setPin]=useState('');
    const [shg,setShg]=useState('');
    const [num,setNum]=useState('');
    const [dateofbirth,setDateofbirth]=useState('');
    const [aadhar,setAadhar]=useState('');
    const [gender,setGender]=useState('');

    const [errmsg,setErrmsg]=useState('');
    const [errpass,setErrpass]=useState('');

    const [subitButtonDisable,setSubmitButtonDisable]=useState(false);

    const navigate=useNavigate();
    // var MyDate = new Date();
    // var fulldate=MyDate.getFullYear()+'-'+(MyDate.getMonth()+1)+'-'+MyDate.getDate();
    // console.log(fulldate);
    // var givedate=parseInt(dateofbirth.slice(0,5))+'-'+parseInt(dateofbirth.slice(5,7))+'-'+parseInt(dateofbirth.slice(8,10));
    // console.log(givedate);
    // console.log(fulldate-givedate);
   
////////////////////////////////////////////////////////////////////
    const handleSubmition=(e)=>{
        e.preventDefault(); 

          if(!name || !lname || !addr || !pass || !repass || !num || !email || !stat || !city || !pin || !shg || !aadhar || !dateofbirth || !gender ){
               setErrmsg("Fill All The Fields");
               return;
          }

          if(pass!==repass){
              
            setErrpass("Both password is not Same");
            return; 
          }
          
        if(num.length!=10){
              
         alert('mobile number should 10 digit and should contain only numbers');
          return; 
        }

      if(aadhar.length!=12){
              
        alert('Aadhar number should 12 digits');
         return; 
       }

       if(pass.length>16 && pass<8){
              
        alert('passwold lenght should b between 8 to 16');
         return; 
       }
       
       if(pin.length!=6){
              
        alert('pin number should 6 digits');
         return; 
       }
      //  if(fulldate<=givedate){
      //   alert('please put valid birthdate');
      //    return; 
      //  }

     setErrpass("");


        
        setSubmitButtonDisable(true);

        
        createUserWithEmailAndPassword(auth, email, pass,num)
          .then(async(userCredential) => {
            // Signed in 

          
            const user = userCredential.user;

                        //add data//
            await setDoc(doc(db, "Admin", (user.uid)), {
                name: name,
                last_name:lname,
                Address: addr,
                email: email,
                Mobile_number:num,
                State: stat,
                city:city,
                shg:shg,
                pin:pin,
                bod:dateofbirth,
                Aadhar:aadhar,
                gender:gender
              });

            setSubmitButtonDisable(false);
            await updateProfile(user,{displayName: name});
            navigate("/SHG");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSubmitButtonDisable(false);
            setErrmsg(errorMessage);
            // ..
          });
         
     
       
   };
  
 /////////////////////////////////////////////////////////////
  
  

  return (
      <div class='container gradient-custom-2 '>
          <div class='row'>
          <center>
          <img src={logo} className="imagess" alt="logo" />
          
         
          
          <div class='container-fluid '>
      
              <h1 className='heading'> SignUp form</h1>
         
          </div>
          </center>
          </div>
    <form id="theForm" class="row g-2 mt-5 ">
                <div class="col-sm-6">
                    <label for="fname" class="form-label" >{t('first_name')}</label>
                    <input type="text" class="form-control" id="fname" onChange={e=>setName(e.target.value)}required/>
                </div>
                <div class="col-sm-6">
                    <label for="lname" class="form-label">{t('last_name')}</label>
                    <input type="text" class="form-control" id="lname" onChange={e=>setLname(e.target.value)}required/>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">{t('email')}</label>
                    <input type="email" class="form-control " id="inputEmail4" onChange={e=>setEmail(e.target.value)} required/>
                </div>
                <div class="col-md-6">
                    <label for="mobile" class="form-label">{t('mobile_no')}</label>
                    <input type="text" class="form-control " id="mobile" onChange={e=>setNum(e.target.value)}required/>
                </div>

                <div class="col-md-6">
                    <label for="dateofbirth" class="form-label">{t('dob')}</label>
                    <input type="date" class="form-control " id="dateofbirth" onChange={e=>setDateofbirth(e.target.value)}required/>
                </div>
                <div class="col-md-6">
                    <label for="aadhar" class="form-label">{t('aadhar_no')}</label>
                    <input type="text" class="form-control " id="aadhar" onChange={e=>setAadhar(e.target.value)}required/>
                </div>


                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">{t('password')} </label>
                    <input type="password" class="form-control" id="inputPassword4" placeholder='passworld lenght should be between 8 to 16' onChange={e=>setPass(e.target.value)}required/>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword5" class="form-label">{t('confirm_password')}</label>
                    <input type="password" class="form-control" id="inputPassword5" placeholder='passworld lenght should be between 8 to 16' onChange={e=>setRepass(e.target.value)} required/>
                </div>
                <div class="col-md-10">
                    <label for="inputAddress" class="form-label">{t('address')}</label>
                    <input type="text" class="form-control" id="inputAddress"  onChange={e=>setAddr(e.target.value)} required/>
                </div>

                <div class="col-md-2 ">
                    <label for="gender" class="form-label">{t('gender')}</label>
                    <input type="text" class="form-control" id="gender" onChange={e=>setGender(e.target.value)} required/>
                </div>
                <div class="col-md-3">
                    <label for="state" class="form-label">{t('state')}</label>
                    <input type="text" class="form-control" id="state" onChange={e=>setStat(e.target.value)} required/>
                </div>
                <div class="col-md-3">
                    <label for="inputCity" class="form-label">{t('city')}</label>
                    <input type="text" class="form-control" id="city" onChange={e=>setCity(e.target.value)} required/>
                </div>
                <div class="col-md-3">
                    <label for="shg" class="form-label">{t('group_name')}</label>
                    <input type="text" class="form-control" id="shg" onChange={e=>setShg(e.target.value)} required/>
                </div>
                <div class="col-md-3">
                    <label for="pin" class="form-label">{t('pincode')}</label>
                    <input type="text" class="form-control" id="pin" onChange={e=>setPin(e.target.value)} required/>
                </div>
                <div class="col-md-3 mb-3">
                    <b className="err"> {errmsg} {errpass}</b>
                    
               
                </div>
                
                <div class="col-12 mb-3">
                    
                <button onClick={handleSubmition} disabled={subitButtonDisable} type="submit" class="btn btn-primary"  >{t('sign_up')}</button>
                </div>
  </form>

  </div>
  );
}

export default Signup;
