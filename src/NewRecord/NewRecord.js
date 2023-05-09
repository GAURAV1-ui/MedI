import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Back from '../components/SignUp/Back';
import styles from './NewRecord.module.css'
import Dates from '../components/Date/Date';
import Button from '../components/UI/Button';
import data from './data';
import axios from "axios";
import { useUserAuth } from '../store/UserAuthContext';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextContainer from '../components/TextContainer/TextContainer'; 
// import { baseUrl } from '../api/axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { EmailShareButton} from "react-share"
import ReactToPrint from "react-to-print";
import FileSaver from 'file-saver';
import { ComponentToPrint } from './ComponentToPrint';
// import { BsPrinter } from 'react-icons/bs';

const qs = require('qs')


const NewRecord = (props) => {
  const [userInput, setUserInput] = useState("");
  const [userTranscribedInput, setUserTranscribedInput] = useState("");
  const [inputDestinationLanguage, setInputDestinationLanguage] = useState(data[0].code);
  const [inputSourceLanguage, setInputSourceLanguage] = useState("en");
  const {userTranslateInput,setUserTranslateInput,token} = useUserAuth();
  // let componentRef = useRef();

  const navigate = useNavigate();
  // const usersCollectionRef = collection(db, "Users");
  const componentRef = useRef();

  const userInputChangeHandler = (event) => {
    setUserInput(event.target.value);
    // console.log(userInput);
  }

  const onSubmitSourceLanguageHandler = () => {
    setInputSourceLanguage("en");
  }
  const onSubmitDestinationLanguageHandler = (event) => {
    setInputDestinationLanguage(event.target.value);
  }



  useEffect(() => {
    axios.get("https://ymyfish.com/api")
      .then((res) => {
        // console.log(res);
      }).catch((err) => {
        // console.log(err);
      })
  }, []);


  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'https://ymyfish.com/api/transcribe',
      data: qs.stringify({
        prompt: userInput,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      const result = res.data.result;
      setUserTranscribedInput(result);
    }).catch((err) => {
    })
  }

  const onSubmitTranscribedHandler = () => {
    if(inputDestinationLanguage.length>1){
    axios({
      method: 'post',
      url: 'https://ymyfish.com/api/translate',
      data: qs.stringify({
        text: userTranscribedInput,
        sourceLanguage: inputSourceLanguage,
        targetLanguage: inputDestinationLanguage
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      setUserTranslateInput(res.data.translatedText);
      // console.log(userTranslateInput);
      // console.log("Translate Response", res.data.translatedText);
    }).catch((err) => {
      // console.log(err);
    })}else{
      toast.error("Please select destintion language");
    }
  }

  // const current = new Date();
  // const createdAt = serverTimestamp();
  // const date = current.toDateString();

  const onSubmitTranslateHandler = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://medinclude-api.onrender.com/api/notes',
      data: {
        title:"This is the title",
        text:userTranslateInput
      },
      headers: {
        'Authorization':`Bearer ${token}`
      }
    }).then((res) => {
      setUserTranslateInput("");
      navigate("/records");
      // console.log(res);
    }).catch((err) => {
      // console.log(err);
    })
    // await addDoc(usersCollectionRef, { createdAt:createdAt,date: date, translatedData:userTranslateInput });
    

    
  };


  const onDownloadHandler = () => {
    // const doc = new jsPDF();
    // doc.setFontSize(25);
    // doc.text("This is translated data", 20, 50);
    // doc.text(userTranslateInput, 20, 10);
    // doc.save("medinclude.pdf");
    var blob = new Blob([userTranslateInput], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "medinclude.txt");      


  }


  // const shareButtonProps = {
  //   url: "https://github.com/greglobinski/react-custom-share",
  //   network: "Facebook",
  //   text: "Give it a try - react-custom-share component",
  //   longtext:
  //     "Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch."
  // };



  return (
    <div>
      <Back />
      <div className={styles.container}>
        <div>
          <h3>New Record</h3>
        </div>
        <Dates />
      </div>
      <div className={styles.transcribed_data}>
      <textarea
        name='userInput'
        placeholder="Enter or paste your records here"
        value={userInput}
        onChange={userInputChangeHandler}
      />
      </div>
      <div className={styles.button}>
        <Button onClick={onSubmitHandler}>Upload</Button>
      </div>
      <div className={styles.selectOption}>
        <div className={styles.select}>
          <p htmlFor="sourcelanguage">Source Language:</p>
          <select
            name="sourcelanguage"
            id="sourcelanguage"
            value={inputSourceLanguage}
            onChange={onSubmitSourceLanguageHandler}>
              <option value={inputSourceLanguage}>English</option>
          </select>
        </div>
        <div className = {styles.select}>
          <p htmlFor="destinationlanguage">Destination Language:</p>
          <select
            name="destinationlanguage"
            id="sourcelanguage"
            value={inputDestinationLanguage}
            onChange={onSubmitDestinationLanguageHandler}>
            {data.map((data) => (
              <option value={data.code}>{data.language}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className={styles.transcribed_data} >
      <textarea
        name='transcribed_data'
        placeholder='Your transcribed record shows up here'
        value={userTranscribedInput}
        // ref={(el) => (this.componentRef = el)}
      />
      </div>
      <div className={`${styles.button} ${styles.button1}`}>
        <Button onClick={onSubmitTranscribedHandler}>Translate</Button>
      </div>
      <ToastContainer/>
      {userTranslateInput.length>1 &&
      <div>
      <TextContainer/>
      <div className={styles.modalButton} style={{marginBottom: "4rem", marginTop: "-2rem"}}>
      {/* <RWebShare
        data={{
          text: "Web Share - MedInclude",
          url: "https://on.natgeo.com/2zHaNup",
          title: "MedInclude",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className={styles.modalButton1} onClick={()=> console.log("Shared successfully")}>Share</button>
      </RWebShare> */}
      <Popup
       contentStyle =
       {{width: "70%",borderRadius:"5px",padding:"1.2rem"}} 
       trigger={<button className={styles.modalButton2}> Share </button>}
        modal nested>
        {
       <div>
          {/* <div className={styles.content}>
            <p>Share your content</p>            
          </div> */}
        <div>
        {/* <button className={styles.modalButton1} onClick={onShareHandler}>Share</button> */}
        <ComponentToPrint ref={componentRef} />
        <ReactToPrint
        trigger={() => <button className={styles.modalButton1} >Print</button>}
        content={() => componentRef.current}
      />
        <EmailShareButton
            // url="www.gmail.com"
            subject="MedInclude Report"
            body={`${userTranslateInput}`}
            // className="Demo__some-network__share-button"
            >
          <button className = {styles.modalButton3} >Email</button>
        </EmailShareButton>
        {/* <a href="mailto:max.mustermann@example.com?body=`${userTranslateInput}`">E-Mail to Max Mustermann</a> */}

        
        </div>
        </div>

          }
      </Popup>
      <Popup
       contentStyle =
       {{width: "70%",borderRadius:"5px",padding:"1.2rem"}} 
       trigger={<button className={styles.modalButton2}> Save </button>}
        modal nested>
        {
       <div className={styles.modal}>
          <div className={styles.content}>
            <p>{userTranslateInput}</p>            
          </div>
        <div className={styles.modalButton}>
          <button className={styles.modalButton1} onClick={onSubmitTranslateHandler}>Save</button>
          <button className = {styles.modalButton2} onClick={onDownloadHandler} >Download</button>
        </div>
        </div>

          }
            </Popup>
        
      </div>

      </div>
}
   
  
    </div>
  )
}

export default NewRecord;