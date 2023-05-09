import React from 'react';
import Card1 from '../UI/Card1';
import Date from '../Date/Date';
import classes from './TextContainer.module.css'
import { useUserAuth } from '../../store/UserAuthContext';
const TextContainer = () => {
  const {userTranslateInput} = useUserAuth();
// var day = current.toLocaleString('default', { day: 'long' });
// const month = current.toLocaleString('default', { month: 'long' });
// const date = `${current.getMonth()} ${current.getDate()},${current.getFullYear()}`;

  return (
    <Card1>
        <div className= {classes.container}>
        <div>
            <h3>Test Result</h3>
        </div>
        <Date/>
        </div> 
        <br/>
        <section>
            <p>{userTranslateInput}</p>
        </section> 
    </Card1>
  )
}

export default TextContainer