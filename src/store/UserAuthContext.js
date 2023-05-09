import { createContext, useContext, useState } from "react";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  // const [currentUser, setCurrentUser] = useState(null);
  const[userTranslateInput,setUserTranslateInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);
  let resetLogoutTimer;

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });
  // }, [currentUser]);

  const localtoken = localStorage.getItem('jswToken');
  const localExpiryDate = localStorage.getItem('expiryDate');
  const userId = localStorage.getItem('userId');
  const [token, setToken] = useState(localtoken);
  const [expiryDate, setExpiryDate] = useState(localExpiryDate);
  let userLoggedIn = !!token;

  // if (!localtoken || !expiryDate || !localUerRole) {
  //   logOutHandler();
  // }
  // if (new Date(expiryDate) <= new Date()) {
  //   logOutHandler();
  //   //   return;
  // }

  const calculateRemainingTime = expiryDate => {
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    return remainingMilliseconds;
  };

  const logOutHandler = () => {
    localStorage.removeItem('jswToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('expiryDate');
    setToken(null);
    if (resetLogoutTimer) {
      clearTimeout(resetLogoutTimer);
    }
  };

  const loginHandler = user => {
    // console.log(user);
    localStorage.setItem('jswToken', user.token);
    localStorage.setItem('userId', user.userId);
    const remainingMilliseconds = 7 * 3600 * 60 * 60 * 1000; //1h
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem('expiryDate', expiryDate.toISOString());
    setToken(user.token);
    userLoggedIn = true;

    const remainingTime = calculateRemainingTime(expiryDate);

     resetLogoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  // const authContextValue = {
  //   token: token,
  //   login: loginHandler,
  //   isUserLoggedIn: userLoggedIn,
  //   logout: logOutHandler,
  // };


  return (
    <userAuthContext.Provider
      value={{ token, loginHandler, logOutHandler,userLoggedIn,userTranslateInput,setUserTranslateInput, firstName,setFirstName,lastName,setLastName,email,setEmail,agreement,setAgreement}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}