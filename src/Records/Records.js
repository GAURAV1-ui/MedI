import React from 'react'
import TextContainer2 from '../components/TextContainer/TextContainer2'
import styles from './Records.module.css'
import Navbar from '../components/Menu/Navbar'

import { useUserAuth } from "../store/UserAuthContext";

const Records = (props) => {
  const {userTranslateInput} = useUserAuth();
  // console.log("Translate Api CheCKIG",userTranslateInput );
  const {userLoggedIn} = useUserAuth();
  return (
    <>
        <Navbar/>
        <div className={styles.record}>
            <h1>Records</h1>
        </div>
        {userLoggedIn&&<TextContainer2/>}
        
    </>
  
  )
}

export default Records