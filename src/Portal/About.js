import React from 'react'
import med from '../Images/images.webp';
import styles from './About.module.css';

const About = () => {
  return (
    <div>
      <div className={styles.heading} id="about">
      <h1>About</h1>
      </div>
      <div className={styles.about_background}>
        <div className={styles.about_container}>
          <div className={styles.float_container}>
            <div className={`${styles.float_child} ${styles.left}`}>
              <h1> 
                About MedInclude
              </h1>
              <br/>
              <p>Understanding medical information is essential to improving patient engagement and involvement in their own care.
                <br/>
                <br/>
                MedInclude is a secure AI-based data processing solution that can help healthcare institutions transcribe patient notes to lay terminology in real time and without losing the essence of the information.
                <br/>
                <br/>
​                  Patients can access the transcribed notes from their medical visit in multiple languages post consult, making it the ideal solution to aid information retention.</p>             
            </div>
            <div className={`${styles.float_child} ${styles.right}`}>
              <img className={styles.about_img} src={med} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About