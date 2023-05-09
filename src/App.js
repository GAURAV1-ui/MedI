import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// import Navbar from './components/Menu/Navbar';
import Portal from './Portal/Portal';
import Records from "./Records/Records";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PhoneVerification from "./components/SignUp/PhoneVerification";
import Password from "./components/SignUp/Password";
import NewRecord from "./NewRecord/NewRecord";
import { UserAuthContextProvider } from "./store/UserAuthContext"
import { useUserAuth } from "./store/UserAuthContext";
import Privacy from "./components/PrivacyPolicy/Privacy";
import ForgetPassword from "./components/SignUp/ForgetPassword";
import ForgetPasswordForm from "./components/SignUp/ForgetPasswordForm";
import Contact from "./Portal/Contact";


function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(); 
  

  
  // const {setButtonIsShown} = useUserAuth();
  // const [translateData, setTranslateData] = useState("");
  // const onClick = (data) => {
  //   alert(data);
  //   setTranslateData(data);
  //   console.log(data);
  //   console.log(translateData);
  // }
  // const logOutHandler = () => {
  //   setUserLoggedIn(false);

  //   localStorage.removeItem('jswToken');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('expiryDate');
  // };

  

 
  return (
    <main> 
      <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Portal/>}/>
          <Route exact path="/records" element={<Records/>}/> 
          <Route exact path = "/newrecord" element = {<NewRecord/>}/>
          <Route exact path= "/login" element ={<Login/>}/>
          <Route exact path ="/signup" element = {<SignUp/>}/>
          <Route exact path ="/phoneverification" element = {<PhoneVerification/>}/>
          <Route exact path ="/password" element = {<Password/>}/>
          <Route exact path ="/privacypolicy" element = {<Privacy/>}/>
          <Route exact path = "/forgetpassword" element = {<ForgetPassword/>}/>
          <Route exact path = "/auth/password/reset/:token" element = {<ForgetPasswordForm/>}/>
          <Route exact path = "/contact" component = {Contact}/>
        </Routes>  
        </UserAuthContextProvider>        
      </Router>
    </main>
  );
}

export default App;
