import React,{useState} from 'react'
import axios from 'axios';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input/Input';
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserAuth } from '../../store/UserAuthContext';
import  styles  from './ForgetPasswordForm.module.css';
import HomeButton from './HomeButton';

const ForgetPasswordForm = () => {
    const [newPassword, setNewPassword] = useState();
    const [newConfirmPassword, setNewConfirmPassword] = useState();
    const {token} = useUserAuth();

    const navigate = useNavigate();

    const changePasswordHandler = (event) => {
        setNewPassword(event.target.value);
    }
    const changeConfirmPasswordHandler = (event) => {
        setNewConfirmPassword(event.target.value);
    }
    const param = useParams();
    // console.log(param.token);

    const onSubmitPasswordBtnClick = async (event) => {
        event.preventDefault();
        let passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
        if (newPassword === "" || newConfirmPassword === '') {
          toast.error("Please enter password");
          return;
        } if (!passwordRegExp.test(newPassword)){
          toast.error("Password is not Valid");
          return;
        } 
        if(newPassword !== newConfirmPassword){
            toast.error("Confirm password didn't match");
          return;
        }
        await axios({
        method: 'put',
        url: 'https://medinclude-api.onrender.com/api/reset-password',
        data: {
          resetPasswordLink:param.token,
          newPassword: newPassword,
        },
        headers: {
          'Authorization':`Bearer ${token}`
        }
      }).then((res) => {
        localStorage.removeItem('jswToken');
        navigate("/login");
      }).catch((err) => {
        toast.error("Link expired please try again")
        // console.log(err);
      })     
    }
 
  return (
    <div>
        <HomeButton/>
         <Card>
        {/* <div>
            <div className= {styles.polygon}></div>
            <hr className= {styles.line}/>
        </div> */}
        <div className={styles.heading}>
            <h2>Create password for your account</h2>
        </div>
        <form >
        <Input 
        id = "password" 
        label= "Password" 
        type="password" 
        required
        onChange={changePasswordHandler}
        />
        <Input 
        id = "confirmpassword" 
        label= "Confirm Password" 
        type="password" 
        required
        onChange={changeConfirmPasswordHandler}
        />
        <ToastContainer/>
         <div className={styles.instruction}>
        <p>Your password must contains:</p>
        <div className={styles.instruction_details}>
        <p>Minimum of 8 characters</p>
        <p>At least one number</p>
        <p>At least one uppercase letter</p>
        <p>At least one lowercase letter</p>
        </div>
        </div>
        <div className={styles.button}>
        <Button 
        type="submit" onClick = {onSubmitPasswordBtnClick}>Confirm</Button>
        </div>
        </form> 
    </Card>
    </div>
  )
}

export default ForgetPasswordForm