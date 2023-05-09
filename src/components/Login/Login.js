import React,{useState} from 'react'
import { useNavigate, Link} from 'react-router-dom';
import Back from '../SignUp/Back';
import Input from '../UI/Input/Input';
import Card from '../UI/Card';
import CheckBox from './CheckBox'
import Button from '../UI/Button'
import styles from './Login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../api/axios';
import axios from 'axios';
import { useUserAuth } from '../../store/UserAuthContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loginHandler,agreement,setAgreement} = useUserAuth();
    const navigate = useNavigate();

    const changeEmailHandler = (event) => {
        event.preventDefault();
        setEmail(event.target.value);
    }
    const changePasswordHandler = (event) => {
      event.preventDefault();
      setPassword(event.target.value );
  }

    const handleClickSignup =() => {
      navigate("/signup");
    } 


    // const handleClickLogin = async(event) => {
    //     event.preventDefault();

    //     if (password === "" ||email === "") {
    //       toast.error("Please enter email and password");
    //       return;
    //     }
    //     if (password.length<8){
    //       toast.error("Please enter valid email and password");
    //       return;
    //     }

        // setSubmitButtonDisabled(true);
        // try{
        //   await logIn(emails, password);
        //   toast.success("Successfull");
        //   navigate("/");
        // }
  
        //   catch {
        //     console.log();
        //     toast.error("Please enter valid number and password");
        //   };
        // function onRegister() {
        //   signInWithEmailAndPassword(auth, emails, password).then((res)=>{
        //     console.log(res);
        //     toast.success("Successfull");
        //     navigate("/");
        //   }).catch((error) =>{
        //     console.log(error);
        //     toast.error("Please enter valid number and password");
        //   }
        //   );        
        // }
        // onRegister();
        // axios({
        //   method: 'post',
        //   url: 'https://medinclude-api.onrender.com/api/login',
        //   data:{
        //       uniqueId: email,
        //       password: password,
        //   },
        // }).then((res) => {
        //   console.log(res.data);
        //   toast.success("Successfull");
        // }).catch((err) => {
        //   console.log(err);
        //   console.log(err.response)
        //   toast.error("Please enter valid number and password");
        // })
        const userLoginHandle = async authData => {
            
            if (password.length === 0 ||email.length === 0) {
              // console.log("Error")
              toast.error("Please enter email and password");
              return;
              }
         if (password.length<8 ||password.length === 0 ||email.length === 0){
          toast.error("Please enter valid email and password");
          return;
         }
         if(!agreement){
          toast.error("Please agree terms and conditions");
          return;
         }
          // setIsLoading(true)
          const fetchdata = await axios({
            method: 'post',
            data: authData,
            url: `${baseUrl}/login`,
          }).catch((err) =>{
            // console.log(err.response.data.error);
            toast.error(err.response.data.error);
          })
          // .then((res) =>{
          //   navigate("/");
          //   console.log(res);
          //   toast.error(res)
          // }).catch((err)=>{
          //   toast.error(err.error);
          // })
          // if (
          //   fetchdata.status !== 200 ||
          //   (fetchdata.status !== 201 && fetchdata.data.isError)
          // ) {
          //   setIsLoading(false)
          //   setErrosMade({
          //     title: 'Error',
          //     message: fetchdata.data.message,
          //   });
          // }
         
        
          if (
            fetchdata.status === 200 ||
            (fetchdata.status === 201 && fetchdata.data.isSucces)
          ) {
            // setIsLoading(false)
            // setErrosMade(false);
            const userData = {
              token: fetchdata.data.token,
              userId: fetchdata.data._id,
            };
            loginHandler(userData);
            setAgreement(false);
            navigate("/")
        };
      }
      
        const handleClickLogin = async e => {
          e.preventDefault();
          if (email.trim().length === 0 || password.trim().length === 0) {
            // setErrosMade({
            //   title: 'Error',
            //   message: 'Field should not be empty',
            // });
            return;
          }
          if (!email.trim().includes('@')) {
            // setErrosMade({
            //   title: 'Error',
            //   message: 'Invalid mail!',
            // });
            return;
          }
      
          const zData = {
            uniqueId: email,
            password: password
          };
      
          userLoginHandle(zData);
    };
  

  return (
   
    <div>
    <Back/>
<Card>
    <div className={styles.loginHeading}>
         <h1>MedInclude</h1>
        <h5>Simple. Understandable. Accessible</h5>
    </div>
    <form >

    {/* <PhoneInput
        className={styles.phoneInput}
        international
        countryCallingCodeEditable={false}
        defaultCountry="US"
         placeholder="Enter phone number"
         value={email}
         onChange={setEmail}  
         /> */}
     <Input 
    id = "email" 
    type="email" 
    value ={email}
    onChange ={changeEmailHandler}
    required
    />
    <ToastContainer/>
    <Input 
    id = "password" 
    type="password" 
    value ={password}
    onChange ={changePasswordHandler}
    required
    />
    <div className={styles.checkboxContainer}>
    <CheckBox/>
    <Link to = "/forgetpassword" className={styles.forgetPassword}> Forgot password</Link>

    </div>
    <div className={styles.button}>
    <Button type = "submit" onClick ={handleClickLogin}>Log In</Button>
    </div>
    </form>
   
    <div className={styles.signup}>
    <p>Don't have an account? <button style={{color: "green", backgroundColor: "transparent",border:"none",fontSize:"17px", cursor:"pointer"}} onClick = {handleClickSignup}>Sign Up</button></p>
    </div>
</Card>

</div>

  )
}

export default Login;