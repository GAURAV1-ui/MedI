import React from 'react'
import { Link } from "react-router-dom";
// import TextContainer1 from '../components/TextContainer/TextContainer1';
import styles from './Portal.module.css';
// import Button from '../components/UI/Button';
import Navbar from '../components/Menu/Navbar';
import med from '../Images/2.webp';
import About from './About';

import { useUserAuth } from "../store/UserAuthContext";
import Contact from './Contact';

const clickSecurityHandler = () => {
  window.open ('https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/556712d9bf0f4cb2a916cc810687d52b/files/risk-management-resources/risk-management-handouts/Data_Security_Policy.pdf','_blank', 'noreferrer');
}

const clickTermsHandler = () => {
  window.open('https://www.cmpa-acpm.ca/static-assets/pdf/advice-and-publications/risk-management-toolbox/com_terms_of_use_agreement_template-e.pdf');
}

const Portal = () => {
  const {userLoggedIn} = useUserAuth();
  // const navigate = useNavigate();
  // const {currentUser} = useUserAuth();

  // const handleClickLogin =() => {
  //   navigate("/signup");
  // }
  // const handleClickStarted =() => {
  //   navigate("/");
  // }
  return (

    <div>
      <Navbar/>
      <div className={styles.heading}>
      <h1>Your health in your hands</h1>
      </div>
      <div className={styles.home_background}>
        <div className={styles.home_container}>
          <div className={styles.float_container}>
            <div className={`${styles.float_child} ${styles.left}`}>
              <h1>
                Medical Information:
              </h1>
              <br/>
              <ul>
                <li>Simple</li>
                <li>Accessible</li>
                <li>Understandable</li>
              </ul>
              <br/>
              <p>Simplify medical information in three minutes. Read it in your preferred language and access it anytime, anywhere.</p>
              {!userLoggedIn && <div className={`${styles.home_form_group} ${styles.buttons}`}>
                <button
                  className={styles.home_form_button}
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                >
                  Sign up
                </button>
                
              </div>
              }
            </div>
            <div className={`${styles.float_child} ${styles.right}`}>
              <img className={styles.home_img} src={med} alt="" />
            </div>
          </div>
        </div>
      </div>
      <About/>
      <Contact/>
      <div className={styles.footer}>
        <Link to= "" onClick={clickSecurityHandler}>Security and Trust</Link>
        <Link to="" onClick = {clickTermsHandler}>Terms of Use</Link>
        <Link to="/privacypolicy">Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Portal;