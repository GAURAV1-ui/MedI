import React from 'react'
import styles from './Date.module.css';


const Dates = () => {
const current = new Date();
const day = current.toDateString();
  return (
    <div className={styles.date}>
            {day}
    </div>
  )
}

export default Dates