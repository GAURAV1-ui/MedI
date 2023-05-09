import React from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../../Images/back.png'
import styles from './Back.module.css';
  const Back= () => {
    const navigate = useNavigate();
    const goBack = () => {
      
      navigate(-1);
    }
  return (
    <div className={styles.backNavigate}>
        <img src={logo} alt = "" onClick = {goBack}/>
        <div className={styles.back}>
        <button onClick = {goBack}> Back </button>
        </div>
    </div>
  )
}

export default Back
