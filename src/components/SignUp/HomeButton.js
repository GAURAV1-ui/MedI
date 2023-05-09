import React from 'react'
import {useNavigate} from 'react-router-dom';
import logo from '../../Images/back.png'
import styles from './Back.module.css';
  const HomeButton= () => {
    const navigate = useNavigate();
    const goBack = () => {
      
      navigate("/");
    }
  return (
    <div className={styles.backNavigate}>
        <img src={logo} alt = "" onClick = {goBack}/>
        <div className={styles.back}>
        <button onClick = {goBack}> Home </button>
        </div>
    </div>
  )
}

export default HomeButton;