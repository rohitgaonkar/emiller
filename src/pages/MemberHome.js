import React, { useContext, useEffect, useState }  from 'react';
import ReactDom from 'react-dom';
import './MemberHome.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import profile from './profile.jpeg';
import ViewSavings from './viewSavings.png';
import RequestLoan from './requestLoan.png';
import ViewLoan from './viewLoan.png';
import { Link, useNavigate } from 'react-router-dom';

import playstore from './app-store.png';
import shglogo from './shglogo.png';

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




function User() {


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

  const tt=localStorage.getItem('memberEmail');
  const oo=localStorage.getItem('AdminId');
  const ll=localStorage.getItem('groupName');
  const kk=localStorage.getItem('Period');
  console.log(tt);
  console.log(oo);
  console.log(ll);
  console.log(kk);


  const navigate=useNavigate();

  const handleSubmition=(e)=>{
    e.preventDefault(); 
      
    localStorage.removeItem('memberEmail');
    localStorage.removeItem('AdminId');
    localStorage.removeItem('groupName');
    localStorage.removeItem('Period');
    navigate("/Login");
     
};

 
 
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
                              
                              <li><a class="dropdown-item" onClick={handleSubmition}>{t('log_out')}</a></li>
                    </ul>
                  </li>
              </div>
        </div>
            

          <div class="container-fluid  bg-primary" id="accordion" className='contain'>
            
            <div class="row" >
              <div class="col-xl-4 col-lg-4 col-sm-12 col-12 ">
                <Link to={'/MemberViewSavings'}>
                 <div className='Menus' id='menus1' data-bs-toggle="collapse" href="#list1">
                    
                      <img src={ViewSavings} className="images" alt="View Savings" />

                </div>
               
                </Link>
                <center><h6>{t('view_savings')}</h6></center>
            </div>
            
            <div class="col-xl-4 col-lg-4 col-sm-12 col-12">

            <Link to={'/RequestLoan'}>
               <div className='Menus' id='menus2' data-bs-toggle="collapse" href="#list2">

                     <img src={RequestLoan} className="images" alt="Request Loan" />
                         
                </div>
                
                </Link>
                <center><h6>{t('request_loan')}</h6></center>
            </div>

            <div class="col-xl-4 col-lg-4 col-sm-12 col-12">
            <Link to={'/MemberViewLoan'}>
             
                <div className='Menus' id='menus3' data-bs-toggle="collapse" href="#list3" >
                        
                        <img src={ViewLoan} className="images" alt="View Loan" />
                        
                        
                </div>
               
                </Link>
                <center> <h6>{t('view_loan')}</h6></center>
            </div>     

                 

     </div>
  </div>

  


	<footer class="container-fluid bg-dark " id="info">

            <div class="row">
                <div class="foo1  col-xl-3 col-lg-3 col-sm-12">
                  <center><h3 className='white'>{t('download_app')}</h3>
                    <p className='white'>{t('app_for_android_ios')}</p></center>
                    
                    <center> <div >
                      <img src={playstore} className="footerimage" alt="logo"/>
                      </div></center>
                   
                </div>

                <div class="foo2  col-xl-6 col-lg-6 col-sm-12">
                  <center> <img src={shglogo} className="footerimage" alt="logo"/></center>
               
                    <p className='white'>{t('sgh_footer_info')}</p>
                <center><p class="copyright" className='white'>{t('copyright')}</p></center>
                    
                </div>

                <div class="foo3 col-xl-3 col-lg-3 col-sm-12">
                  <center><h3 className='white'>{t('useful_links')}</h3></center>
                    <center>  <ul>
                        <li> <Link to={'/Help'}><h4>{t('help')}</h4> </Link></li>
                    </ul></center>
                  
                </div>

            </div>
          
</footer>



	</>
    

  );
}

export default User;