import React,{useEffect,useState} from 'react';
import Card1 from '../UI/Card1';
// import Date from '../Date/Date';
import {db} from '../../firebase';
import {collection,getDocs} from 'firebase/firestore'
import { query, orderBy,limit} from "firebase/firestore"; 
import classes from './TextContainer1.module.css'
const TextContainer1 = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = query(collection(db, "Users"));
  const q = query(usersCollectionRef, orderBy('createdAt',"desc"),limit(1))
  useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(q);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getUsers();
    }, []);

  return (
    <>
          {users.map((data) => {
          return(
          <Card1>
            <div className={classes.container}>
              <div>
                <h3>Test Result</h3>
              </div>
            {data.date}
          </div>
          <br/>
          <section>
              <p>{data.translatedData}</p>
          </section>
          </Card1>
          )}
          )}
        </>

  )
}

export default TextContainer1;