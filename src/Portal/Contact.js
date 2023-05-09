import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contact.module.css';
import med from '../Images/images2.webp';
import Button from '../components/UI/Button';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const navigate = useNavigate();

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const onChangeLastName = (event) => {
        setlastName(event.target.value);
    }
    const onChangeEmail = (event) => {
      setEmail(event.target.value);
  }
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
}

    const onContactHandler = () => {
      axios({
        method: 'post',
        url: 'https://medinclude-api.onrender.com/api/contact',
        data:{
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: message,
        },
      }).then((res) => {
        toast.success(res.data);
        setFirstName("");
        setlastName("");
        setEmail("");
        setMessage("");
      }).catch((err) => {
        toast.error("Please eneter details");
      })
    }

  return (

    <div className={styles.about_background}>
      <div className={styles.about_container}>
        <div className={styles.float_container}>

        <div className={`${styles.float_child} ${styles.left}`}>
            <img className={styles.about_img} src={med} alt="" />
        </div>
          <div className={`${styles.float_child} ${styles.right}`}>
            <div id="contact">
            <h1>              
              Request a Demo
            </h1>
            <br/>
            <div>
            <div className={styles.contact}>
            <div className={styles.firstName}>
            <label>First Name</label>  
            <input 
            type="text"
            id="text"
            value={firstName}
            onChange={onChangeFirstName}/> 
            </div>
            <div className={styles.firstName}>
            <label>Last Name</label>  
            <input 
            type="text"
            id="text"
            value={lastName}
            onChange={onChangeLastName}/> 
            </div>
            </div>
            <div className={styles.lastName}>
            <label>Email *</label>  
            <input 
            type="email"
            id="email"
            value={email}
            onChange={onChangeEmail}
            required />
            
            </div>
            <div className={styles.message}>
            <label >Add message here</label>
            <textarea
              name='userInput'
              value={message}
              onChange= {onChangeMessage}
              />
              <ToastContainer/>
              </div>
              <div className={styles.contactButton}>
              <Button onClick = {onContactHandler}>Submit</Button>
              </div>
            </div>
            </div>
          </div>
        </div>
        
      </div>




</div>
  )
}

export default Contact;