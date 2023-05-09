import React from 'react'
import styles from './CheckBox.module.css'
import {  Link } from 'react-router-dom';
import { useUserAuth } from '../../store/UserAuthContext';

const CheckBox = () => {
  const {setAgreement} = useUserAuth();
  const handleChangeInput = (event) => {
    setAgreement(event.target.checked);
  }

  return (
    <div> 
    <div className={styles.loginCheckBox}>
        <div className={styles.checkbox1}>
        <input type="checkbox" id="checkbox1" name="checkbox1" value="checkbox1" onChange={handleChangeInput}/>
        <label for="checkbox1"></label>
        <span className={styles.button}><Link to = "/privacypolicy" style={{textDecoration: "none", color:"#106e5b"}}>I agree with Terms of Service & Privacy Policy</Link></span>
        </div>
        
        
    </div>
    </div>
  )
}

export default CheckBox