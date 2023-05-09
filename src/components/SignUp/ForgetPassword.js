import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input/Input';
import Back from './Back';
import styles from './Password.module.css';
// import { baseUrl } from '../../api/axios';
import axios from 'axios';
import { useUserAuth } from '../../store/UserAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {token} = useUserAuth();
  const [forgetEmail, setForgetEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const changeForgetPasswordHandler = (event) => {
    setForgetEmail(event.target.value);
  }
  const onSubmitBtnClick = async (event) => {

    event.preventDefault();
    if (forgetEmail === '') {
      toast.error('Please enter your email');
      return;
    }
    await axios({
      method: 'put',
      url: 'https://medinclude-api.onrender.com/api/forgot-password',
      data: {
        uniqueId:forgetEmail
      },
      headers: {
        'Authorization':`Bearer ${token}`
      }
    }).then((res) => {
      toast.success("Check your email for verification link");
      setFlag(true);
    }).catch((err) => {
      toast.error("Email doesnot exist")
      // console.log(err);
    })
  };

  return (
    <div>
        <Back/>
    <Card>
    { !flag &&
        <div>
          <div>
          
            <div className= {styles.polygon}></div>
            <hr className= {styles.line}/>
        </div>
        <div className={styles.heading}>
            <h2>Enter your email to change your password</h2>
        </div>
        </div>
}
        { !flag &&
        <form >
        <Input 
        id = "email" 
        type="email" 
        required
        onChange={changeForgetPasswordHandler}
        />
        <ToastContainer/>
         <div className={styles.instruction}>
        <p>Check your email for verification link</p>
        </div>
        <div className={styles.button}>
        <Button 
        type="submit" onClick={onSubmitBtnClick}>Submit</Button>
        </div>
        </form> 
} 
    {flag &&
    <div className={styles.ForgetPassword}>   
      <p>Check your email for verification link</p>
    </div>
    }
    </Card>
    </div>
  )
}

export default ForgetPassword;