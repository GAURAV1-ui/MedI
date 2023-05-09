import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input/Input';
import Back from './Back';
import {useUserAuth} from "../../store/UserAuthContext"
import styles from './PhoneVerification.module.css';
import { baseUrl } from '../../api/axios';
// import {auth} from '../../firebase'
// import { onAuthStateChanged } from 'firebase/auth';

import axios from 'axios';

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const EmailVerification = () => {    

    const {firstName,email,setEmail} = useUserAuth();
    const [userOtp, setUserOtp] = useState('');
    const [flag, setFlag] = useState(false);
    const [isActive, setISActive] = useState(false);
    const [hasCode, setHashCode] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);

    const navigate = useNavigate();

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
    //       console.log("Auth", currentuser);
    //       setUser(currentuser);
    //     });
    
    //     return () => {
    //       unsubscribe();
    //     };
    //   }, []);

      

    //   useEffect(() => {
    //     const getNumber = async () => {
    //       const data = await getDocs(usersCollectionRef);
    //       setUserNumber(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getNumber();
       
    //   }, []);
    

    const otpChangeHandler = (e) => {
        setUserOtp(e.target.value);
    }   

    // const generateRecaptcha = () => {
    //     window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //          'size': 'invisible',
    //          'callback': (response) => {
    //          }
    //     }, auth);
    // }
    // const validCheck =()=> {userNumber.filter((num) =>{
    //     console.log(num.number);
    //     console.log(number);
    //     console.log(num.number.includes(number.toString()) );
    //     return num.number.includes(number.toString());
    // })};

    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }

          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

    const getOtp = async(event) => {
        event.preventDefault();
        // const numbers =[];
        // userNumber.map((num)=>{
        //     numbers.push(num.number);
        // })
        // console.log(numbers);
        // if(numbers.includes(number)){
        //     toast.error("Number already exist");
        //     return;
        // }
        // if(number.length<11){
        //     toast.error("Enter valid number");
        // }
        // if(number.length >= 11){
            
        //    generateRecaptcha();
        //    let appVerifier = window.recaptchaVerifier;
           
        //    signInWithPhoneNumber(auth,number,appVerifier)
        //    .then(confirmationResult => {
        //     window.confirmationResult = confirmationResult;
        //     setFlag(true);
            
        //    }).catch((error) => {
        //     console.log(error);
        //     setFlag(false);
        //    }) 
        // axios({
        //     method: 'post',
        //     url: 'https://medinclude-api.onrender.com/api/send-otp',
        //     data:{
        //         uniqueId:email
        //     },
        //   }).then((res) => {
        //     console.log(res.data.otp);
        //     setHashCode(res.data.hash);
        //     setFlag(true);
        //   }).catch((err) => {
        //     console.log(err);
        //     setFlag(false);
        //   })

        if(email.length === 0){
            toast.error("Email is empty");
            return;
        }
        const data = {
            uniqueId:email
        }

        await axios
        .post(`${baseUrl}/send-otp`, data)
        .then(result => {
          // console.log(result);
          setHashCode(result.data.hash);
          setFlag(true);
        //   if (
        //     result.status !== 200 ||
        //     (result.status !== 201 && result.data.isError)
        //   ) {
        //     setErrosMade({
        //       title: result.data.title,
        //       message: result.data.message,
        //     });
        //     setTimeout(() => {
        //       navigate("/signin")
        //     }, 3000);
        //     return;
        //   }
        })
        .catch(err => {
          // console.log(err);
          toast.error("Email already exist")
          setFlag(false);
        });
    }
    
    const verifyOtp = async(event) => {
        event.preventDefault();
        // console.log("I got it");
    if(userOtp.length<6 || userOtp.length>6){
        toast.error("Enter valid otp");
    }
    const data = {
        uniqueId: email,
        hash:hasCode,
       otp: userOtp,   
       }
    if(userOtp.length === 6){
            await axios
        .post(`${baseUrl}/verify-otp`, data)
        .then(result => {
          // console.log(result);
          navigate("/password")
        }).catch((err)=>{
            // console.log(err);
        })
        // axios({
        //     method: 'post',
        //     url: 'https://medinclude-api.onrender.com/api/verify-otp',
        //     data:{
        //         uniqueId: email,
        //         hash:hasCode,
        //         otp: userOtp,   
        //     },
        //   }).then((res) => {
        //     console.log(res.data);
        //     navigate("/password");
        //   }).catch((err) => {
        //     console.log(err);
        //   })


        
    }
    }
    const resendOTP = async(event) => {
        event.preventDefault();
        const data = {
            uniqueId:email
        }
        await axios
        .post(`${baseUrl}/send-otp`, data)
        .then(result => {
          // console.log(result);
          setHashCode(result.data.hash);

        })
        .catch(err => {
          // console.log(err);
          toast.error("Email already exist")

        });
        setMinutes(1);
        setSeconds(59);
      };

    

  return (
    <div>
        <Back/>
    <Card>
        {!flag &&
        <div>
        <div>
            
            <div className= {styles.polygon}></div>
            <hr className= {styles.line}/>
        </div>

        <div className={styles.heading}>
            
            <h2>Hi {firstName}! Please enter your email</h2>
            <p>Used for login and recovery of your records</p>
        </div>
        <form >
  
    
        <Input 
        id = "email" 
        label= "Email" 
        type="email"
        value ={email}
        onChange={emailChangeHandler}    
        />
    

        <ToastContainer/>
         <div className={styles.button}>
        <Button type = "submit" onClick={getOtp}>Request OTP</Button>
        </div>
        </form>
        </div>
        }
        {flag &&
        <div>
        <div>
            <div className= {styles.polygon}></div>
            <hr className= {styles.line}/>
        </div>
        <div className={styles.heading}>
            <h2>Hi {firstName}! Please enter your OTP</h2>
            <p>Used for login and recovery of your records</p>
        </div>
   
        <form >
        <Input 
        id = "otp" 
        label= "Verify OTP" 
        type="number" 
        // isValid={emailIsValid} 
        value ={userOtp}
        onChange={otpChangeHandler}
        // onBlur={validateEmailHandler}/>
        />
    <div className={styles.countdown_text}>
    <div>
      {seconds > 0 || minutes > 0 ? (
        
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>Didn't recieve code?</p>
      )}
      </div>
        <div className={styles.btn}>
      <button
        disabled={seconds > 0 || minutes > 0}
        style={{
          color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#106e5b",
        }}
        onClick={resendOTP}
      >
        Resend OTP
      </button>
      </div>
    </div>
        <ToastContainer/>
        {!isActive && <div className={styles.button}>
        <Button type="submit" onClick = {verifyOtp}>Sumbit</Button>
        </div>}
        </form>
        
        </div>
}
    </Card>    
    </div>
  );
};

export default EmailVerification;