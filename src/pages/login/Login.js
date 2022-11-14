import logo from '../logo.png';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createContext, useState, useEffect } from 'react';
import { auth,db} from '../../Firebase';

import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';

import { signInWithEmailAndPassword} from 'firebase/auth';

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


function Login(props) {

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







 
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  
  const [errmsg,setErrmsg]=useState('');
  
  var emailOfMember;
    
  const [subitButtonDisable,setSubmitButtonDisable]=useState(false);

  //const [checkButtonDisable,setCheckButtonDisable]=useState(true);

  const navigate=useNavigate();

  const handleSubmition=(e)=>{
      e.preventDefault(); 

       if( !pass || !email ){
             setErrmsg("Fill All The Fields");
            return;
        }
       setErrmsg("");
      
       
      setSubmitButtonDisable(true);


      if(opff==='option2'){/////////////user Login

        getdata();
       
        var ids = [];
        var grp = [];
        var prd = [];
        var allides = [];
        var MyDate = new Date();
        var MyDateString;
        
        MyDate.setDate(MyDate.getDate() + 30);
        
        MyDateString = MyDate.getFullYear() + '-'
                     + ('0' + (MyDate.getMonth())).slice(-2) + '-'
                     +  ('0' + MyDate.getDate()).slice(-2);
  

        async function getdata(){///////////////////////
        
          const querySnapshot = await getDocs(collection(db, "Admin"));
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           
            // console.log(doc.id, " => ", doc.data());
            ids.push(doc.id);
            grp.push(doc.data().shg);
          });
  
          // console.log(ids);
          // console.log(grp);
       // console.log(ids.length); 
  
        for(var j=0;j<ids.length;j++){
          let a='Admin/'+ids[j]+'/'+grp[j];
  
          const q = query(collection(db,a), where(`end_date`, ">=", MyDateString));
            
                      const querySnapshot = await getDocs(q);
                      querySnapshot.forEach((doc) => {
                        // console.log(doc.id);
                        // console.log(doc.data());
                        prd.push(doc.id);
                        
                        getMember(doc.id,ids[j],grp[j]);
                                    
                                  
                                              
                        });
  
                      }
                     // console.log(prd);
  
  
        
        }////////////////////////////////
  
  
        async function getMember(prd,idss,grps){
  
         
  
          let c='Admin/'+idss+'/'+grps+'/'+prd+'/Members/';
          const querySnapshot = await getDocs(collection(db, c));
                querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                
                  // console.log(doc.id);
                  // console.log(doc.data().email);
                  // console.log(doc.data().passworld);
                  allides.push(doc.id); 
                  wayToLogin(doc.data().email, doc.data().passworld,idss,grps,prd,doc.data().name);
                 
          });
  
        }
        
        localStorage.setItem('allmyids',JSON.stringify(allides));

        function wayToLogin(ee,pp,idsss,grpss,prds,name){

          if(ee == email && pp == pass){
            navigate("/MemberHome");
           

           localStorage.setItem('memberEmail',ee);
           localStorage.setItem('AdminId',idsss);
           localStorage.setItem('groupName',grpss);
           localStorage.setItem('Period',prds);
           localStorage.setItem('MemberName',name);

            emailOfMember=localStorage.getItem('memberEmail');
            props.giveMe(emailOfMember);
              
          }
          else{
  
            setErrmsg('User Credentials are not correct...');
          }
        }
     
        setSubmitButtonDisable(false);
       
      }////////////////////////////////Admin Login
      else{

        signInWithEmailAndPassword(auth, email, pass)
        .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setSubmitButtonDisable(false);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setSubmitButtonDisable(false);
          setErrmsg(errorMessage);
          // ..
        });
    


      }
    
 };



  const [opff,setOpff]=useState();

  if(opff==='option1'){

    document.getElementById("sign").style.visibility='visible';
   

    
  }

  if(opff==='option2'){

    document.getElementById("sign").style.visibility='hidden';
   
  }


  return (
    <>
  
    <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card" id='logintaplate'>
            <div class="card-body p-5">
              <form class="mb-3 mt-md-4">
                      
                <div class="mb-3" className='logo'>
                    <img src={logo} className="image" alt="logo" />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label ">{t('email')}</label>
                  <input type="email" class="form-control" id="email" placeholder="name@example.com"  onChange={e=>setEmail(e.target.value)}required/>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label ">{t('password')}</label>
                  <input type="password" class="form-control" id="password" placeholder="*******"  onChange={e=>setPass(e.target.value)}required/>
                </div>

                <div class="mb-3">
                     <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"  onChange={e=>setOpff(e.target.value) } defaultChecked/>
                      <label class="form-check-label" for="inlineRadio1">{t('admin')}</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={e=>setOpff(e.target.value)}/>
                      <label class="form-check-label" for="inlineRadio2">{t('member')}</label>
                    </div>
                   
                </div>

                <p class="text-danger"><Link to={'/Forgot'}> {t('forgot_password')}</Link></p>
                
                <div class="col-md-3 mb-3">
                    <b className="err"> {errmsg}</b>
                    
               
                </div>
                
                <div class="d-grid">
                  <button onClick={handleSubmition} disabled={subitButtonDisable} class="btn btn-outline-dark" type="submit">{t('log_in')}</button>
                </div>
              </form>
              <div id='sign'>
              
                <p class="mb-0  text-center">{t('no_account')}< Link  class="text-primary fw-bold" to={'/Signup'}>{t('sign_up')}</Link></p>
              </div>

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

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>   
  </>
  );
}
export default Login;       