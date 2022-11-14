import logo from '../logo.png';
import './Forgot.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createContext, useState } from 'react';
import { auth,db,AuthNum} from '../../Firebase';

import { Link, useNavigate } from 'react-router-dom';
import { collection ,addDoc,setDoc, doc,getDoc,getDocs,query, where} from 'firebase/firestore';

import {signInWithEmailAndPassword, sendPasswordResetEmail,} from 'firebase/auth';
import { async } from '@firebase/util';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';





function Forgot(props) {


  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [errmsg,setErrmsg]=useState('');
  const [subitButtonDisable,setSubmitButtonDisable]=useState(false);
  const navigate=useNavigate();

  // require('dotenv').config();
  //const fast2sms = require('fast-two-sms')

 const handleSubmition = async(e)=>{
      e.preventDefault(); 

       if( !email ){
             setErrmsg("Fill All The Fields");
            return;
        }
       setErrmsg("");
 
      setSubmitButtonDisable(true);
     


      if(opff==='option2'){/////////////user Login

      // fast2sms.sendMessage({authorization:'TitljPv0Qk2CoOc5bEXgrNZymu9IVGwn6xhB73Hep4RWLUfdK1v7b46jKImgP9WulzkGQw1hCAdtEJF3',message:'i love u janu',numbers:[email]}).then(response=>{
      //   console.log(response);
      // })

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://www.fast2sms.com/dev/bulkV2",
        "method": "POST",
        "headers": {
          "authorization": "TitljPv0Qk2CoOc5bEXgrNZymu9IVGwn6xhB73Hep4RWLUfdK1v7b46jKImgP9WulzkGQw1hCAdtEJF3",
        },
        "data": {
          "variables_values": "5599",
          "route": "otp",
          "numbers": "7588667492",
        }
      }
      
      // ajax(settings).done(function (response) {
      //   console.log(response);
      // });

       
      }////////////////////////////////Admin Login
      else{

        console.log("reset email sent to " + email);
        sendPasswordResetEmail(auth, email, null)
            .then(() => {
                alert("reset email sent to " + email);
            })
            .catch(function (e) {
                console.log(e);
            });
    
      }



      }
    


   
    
 



  const [opff,setOpff]=useState();





  return (
    <>
  
    <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card  gradient-custom-2">
            <div class="card-body p-5">
              <form class="mb-3 mt-md-4">

             
                      
                <div class="mb-3" className='logo'>
                    <img src={logo} className="image" alt="logo" />
                </div>

                <div class="mb-3" id='rad'>
                   <center> <h3>Forgot Password</h3> </center>
                </div>
                

                <div class="mb-3">
                     <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"  onChange={e=>setOpff(e.target.value) } defaultChecked/>
                      <label class="form-check-label" for="inlineRadio1">Admin</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={e=>setOpff(e.target.value)}/>
                      <label class="form-check-label" for="inlineRadio2">Member</label>
                    </div>
                   
                </div>
              
                <div class="mb-3">
              
                
                  <input type="email" class="form-control" id="email" placeholder="Enter Registered Mobile Number"  onChange={e=>setEmail(e.target.value)}required/>
                </div>

              
                <div class="d-grid">
                  <button onClick={handleSubmition} disabled={subitButtonDisable} class="btn btn-outline-dark" type="submit">Send Code</button>
                </div>
              </form>
           

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>   
  </>
  );
}
export default Forgot;       