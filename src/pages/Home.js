import React,{useEffect,useState} from 'react';

import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import member from './member.png';
import saving from './saving.png';
import loan from './loan.png';
import bank from './bank.png';
import setting from './setting.png';
import report from './report.png';
import profile from './profile.jpeg';

import playstore from './app-store.png';
import shglogo from './shglogo.png';

import ShgProfilePage from './ShgProfilePage';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

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


function Home(props) {

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
        localStorage.removeItem('setgroup');
        localStorage.removeItem('Intrst');
        localStorage.removeItem('finaldate');
        localStorage.removeItem('Rs');
        localStorage.removeItem('Idate');
        localStorage.removeItem('period');
        localStorage.removeItem('sdate');
        localStorage.removeItem('id');
        localStorage.removeItem('late');

        

            }).catch((error) => {
  // An error happened.
        });
     
};


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
                                <Link class="nav-link" to={'/ShgProfilePage'}>{t('shg')}</Link>
                              </li>

                              <li class="nav-item">
                                <a class="nav-link"><Link to={'/'}>{t('home')}</Link></a>
                              </li>
                              <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">{t('language')}</a>
                                                  
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
                              <li><Link class="dropdown-item" to={'/ProfilePage'}>{t('profile')}</Link></li>
                              <li><Link to={'/AddMember'}class="dropdown-item" >{t('change_password')}</Link></li>
                              <li><a class="dropdown-item" onClick={handleSubmition} >{t('log_out')}</a></li>
                    </ul>
                  </li>
              </div>
              
          
            </div>
      
      
  <div class="container-fluid  bg-primary" id="accordion" className='contain'>
      <div class="row" >
            <div class="col-xl-4 col-lg-6 col-sm-6 ">
                 <div className='Menus' id='menus1' href="#list1">
                      
                      <img src={member} className="images" alt="logo" />
                      
                      <ul id='list1' class="collapse show" data-bs-parent="#accordion">
                            <li class="list-group-item list-group-item-action"><a><Link to={'/AddMember'}>{t('add_member')}</Link></a></li>
                            <li class="list-group-item list-group-item-action"><a><Link to={'/DeleteMember'}>{t('delete_member')}</Link></a></li>
                            <li class="list-group-item list-group-item-action"><a><Link to={'/ViewMembers'}>{t('view_all_members')}</Link></a></li>
                            <li className='hide'>View All Members</li>
                      </ul>
                </div>
                <center><h5>{t('manage_members')}</h5></center> 
            </div>

            <div class="col-xl-4 col-lg-6 col-sm-6">
               <div className='Menus' id='menus2'  href="#list2">

                     <img src={saving} className="images" alt="logo" />
                    
                
                     <ul id='list2' class="collapse show" data-bs-parent="#accordion">
                            <li class="list-group-item list-group-item-action"><a><Link to={'/AddSavings'}>{t('add_savings')}</Link></a></li>
                            <li class="list-group-item list-group-item-action"><a><Link to={'/ViewSavings'}>{t('view_total_savings')}</Link></a></li>
                            <li className='hide'>View All Members</li>
                            <li className='hide'>View All Members</li>
                      </ul>
                </div>
                <center><h5>{t('manage_savings')}</h5></center> 
            </div>

            <div class="col-xl-4 col-lg-6 col-sm-6">
                <div className='Menus' id='menus3'  href="#list3" >
                        
                        <img src={loan} className="images" alt="logo" />
                        
                        <ul id='list3' class="collapse show" data-bs-parent="#accordion">
                              <li class="list-group-item list-group-item-action"><a><Link to={'/ViewLoanRequest'}>{t('view_loan_requests')}</Link></a></li>
                              <li class="list-group-item list-group-item-action"><a> <Link to={'/AddInstallment'}>{t('add_loan_installment')}</Link> </a></li>
                              <li class="list-group-item list-group-item-action"><a><Link to={'/ViewActiveLoans'}>{t('view_active_loans')}</Link></a></li>
                              <li class="list-group-item list-group-item-action"><a><Link to={'/ViewFinishedLoans'}>{t('view_finished_loans')}</Link></a></li>
                        </ul>
                </div>
                <center><h5>{t('manage_loans')}</h5></center> 
            </div>          
          
    
          <div class="col-xl-4 col-lg-6 col-sm-6" >
             <div className='Menus' id='menus4'  href="#list4">

                    <img src={bank} className="images" alt="logo" />
                    
                    <ul id='list4'  class="collapse show" data-bs-parent="#accordion">
                              <li class="list-group-item list-group-item-action"><a ><Link to={'/Transection'} >{t('manage_transactions')}</Link></a></li>
                              <li className='hide'>View All Members</li>
                    </ul>
               </div>
               <center><h5>{t('bank')}</h5></center> 
          </div >

          <div class="col-xl-4 col-lg-6 col-sm-6">
              <div className='Menus' id='menus5'href="#list5" >

                    <img src={setting} className="images" alt="logo" />
                    
                    <ul id='list5' class="collapse show" data-bs-parent="#accordion">
                              <li class="list-group-item list-group-item-action"><a> <Link to={'/ViewSettings'}>{t('set_field_values')}</Link></a></li>
                              <li className='hide'>View All Members</li>
                              <li className='hide'>View All Members</li>
                              <li className='hide'>View All Members</li>
                     </ul>
              </div>
              <center><h5>{t('settings')}</h5></center> 
          </div>
          <div class="col-xl-4 col-lg-6 col-sm-6">
              <div className='Menus' id='menus6'  href="#list6" >

                    <img src={report} className="images" alt="logo" />
                    
                    <ul id='list6' class="collapse show" data-bs-parent="#accordion">
                              <li class="list-group-item list-group-item-action"><a ><Link to={'/MemberReport'}>{t('view_members_report')}</Link> </a></li>
                              <li class="list-group-item list-group-item-action"><a ><Link to={'/MonthlyReport'}>{t('view_monthly_profit')}</Link></a></li>
                              <li class="list-group-item list-group-item-action"><a ><Link to={'/AnnualReport'}>{t('view_end_season_report')}</Link> </a></li>
                              <li className='hide'><a href=''>{t('view_total_interest_profit')}</a></li>
                    </ul>
              </div> 
             <center><h5>{t('reports')}</h5></center> 
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

export default Home;
