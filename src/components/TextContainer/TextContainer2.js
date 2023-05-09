import React,{useEffect,useState} from 'react';
import Card1 from '../UI/Card1';
import { useUserAuth } from '../../store/UserAuthContext';
import { Link } from 'react-router-dom';
// import {db} from '../../firebase';
// import {collection,getDocs} from 'firebase/firestore'
// import { query, orderBy} from "firebase/firestore";

import axios from 'axios'; 
import classes from './TextContainer2.module.css'
import Popup from 'reactjs-popup';
const TextContainer2 = () => {
    const [users, setUsers] = useState([]);
    const {token} = useUserAuth();
    // const usersCollectionRef = query(collection(db, "Users"));
    // const q = query(usersCollectionRef, orderBy('createdAt',"desc"))
    // useEffect(() => {
    //     const getUsers = async () => {
    //       const data = await getDocs(q);
    //       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //       console.log(users[0]);
    //     };
    
    //     getUsers();
    //   }, []);

   

    useEffect(() => {
      axios({
        method:'get',
        url:"https://medinclude-api.onrender.com/api/notes",
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }).then((res) => {
          // console.log(res.data.allNote);
          setUsers(res.data.allNote);
          
        }).catch((err) => {
          // console.log(err);
        })
    }, []);

  return (
    <>

        {users.map((data,index) => {
          return(
          <Card1>
            <div className={classes.container}>
              <div>
                <h3>Test Result {index+1}</h3>
              </div>
            {new Date(`${data.createdAt}`).toDateString()}
            </div>
          <br/>            
            <Popup 
              contentStyle =
              {{width: "70%",borderRadius:"5px",padding:"1.2rem"}} 
              trigger = {<section>{(`${data.text}`).slice(0,120)}</section>} 
              modal nested>{
                <div>
                <h3>Test Result {index+1}</h3>
                <br/>
                <section>{data.text}</section>
                </div>
             }
            </Popup>
          </Card1>
          )
        }
          )}
        </>

  )
}

export default TextContainer2;