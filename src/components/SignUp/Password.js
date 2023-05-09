import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input/Input';
import Back from './Back';
import styles from './Password.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useUserAuth} from "../../store/UserAuthContext";
import axios from 'axios';

const Password = () => {

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState();
  const {firstName,lastName, email} = useUserAuth();

  const changePasswordHandler = (event) => {
  const passwordInputValue = event.target.value.trim();
  setPassword(passwordInputValue);
  }
  const changeConfirmPasswordHandler = (event) => {
    setNewConfirmPassword(event.target.value);
}
    const handleSubmission = (event) => {
    event.preventDefault();
    let passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
    if (password === "") {
      toast.error("Please enter password");
      return;
    } if (!passwordRegExp.test(password)){
      toast.error("Password is not Valid");
      return;
    }   

    if( password!== newConfirmPassword){
      toast.error("Confirm password didn't match");
    return;
  }

      axios({
          method: 'post',
          url: 'https://medinclude-api.onrender.com/api/register',
          data:{
              firstName: firstName,
              lastName: lastName,
              uniqueId: email,
              password: password,
          },
        }).then((res) => {
          toast.success("Please login");
          navigate("/login");
        }).catch((err) => {
            toast.error("Please enter your all details")
        })
  };

  return (
    <div>
        <Back/>
    <Card>
        <div>
            <div className= {styles.polygon}></div>
            <hr className= {styles.line}/>
        </div>
        <div className={styles.heading}>
            <h2>Create password for your account</h2>
        </div>
        <form onSubmit={handleSubmission}>
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
        type="submit">Continue</Button>
        </div>
        </form> 
    </Card>
    </div>
  );
};

export default Password;