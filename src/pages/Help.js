
import logo from './logo.png';
import profile from './profile.jpeg';
import './Help.css'
import React,{useEffect,useState} from 'react';
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



function Help(){

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

 
        <center class="form-label"><h1>Help </h1></center>
        <div>
      
        <p id="theHelp">
        <span id="mm">Admin Side</span>
          <li>First you need to signUp - Add SHG page will appear - Fill all the details - Click ADD button - Enter Bank Details </li>

          <br/><span id="mm">Manage Member</span>
          <li>When we hover on manage member it will show 3 options</li>
          <ol>
            <li>Add Member - Enter all the details - Add member - Member details can be viewed</li>
            <li>Delete Member - Enter member id - Details will be displayed - Click delete</li>
            <li>View Member - Show al details entered of the member</li>
          </ol>

        <span id="mm">Manage Savings </span>
          <li>You can add savings and view total savings</li>
          <ol>
            <li>In add savings you can only see the name of the member of the next month </li>
            <li>In view total savings you can see the names of all the members and whether the installments are paid for the particular month </li>
          </ol>

          <span id="mm">Manage Loan </span>
          <li>We can see loan request, loan installments, active loan and finished loans</li>
          <ol>
            <li>In loan request you can see details of all members you can tick the check box in the grant loan option and the name will be visible in loan installments</li>
            <li>In loan installments you can see the details of members who have taken loans</li>
            <li>In active loan we can check the member whose loan is active</li>
            <li>In finished loan we can check the members who have finished with the loan</li>
          </ol>

          <span id="mm">Bank transactions</span>
          <li>In this we can check the transactions and amount made by a member for the particular month</li>

          <br/><span id="mm">Settings</span>
          <ol>
            <li>Over here you can set the installment amount which will be paid every month</li>
            <li>In these we can even set the interest value </li>
            <li>If any members pays the installment late for a particular month then we can even set the value for late fees</li>
          </ol>
          
          <br/><span id="mm">Report </span>
          <li>We can view member report, monthly profit and even end session report in reports option
          </li>

          <br/><span id="mm">Member Side</span>
          <br/><span id="mm">View Savings</span>
          <ol>
            <li>In view savings the user can see the month and amount paid by the member till the group is active</li>
          </ol>

          <br/><span id="mm">Request Loan</span>
          <ol>
            <li>In request loan the member need to fill some fields like name, email, witness email and loan amount and then request for the loan to the admin of the group</li>
          </ol>

          <br/><span id="mm">View Loan</span>
          <ol>
            <li>After requesting for the loan admin will get the request</li>
            <li>If the request for the loan is accepted and the loan is granted</li>
            <li>Admin will pay the monthly installments of the loan taken</li>
            <li>So here the user will be able to see how many installments he has paid</li>
          </ol>
        </p>

        </div>

   </>



    );
}

export default Help;
