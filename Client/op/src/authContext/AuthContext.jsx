import { useEffect, useState, createContext, useContext } from "react";
import PropType from 'prop-types'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import {useDispatch} from 'react-redux';
import passwordReset from '../redux/feature/userCred/UserCredsSlice'

const Context = createContext();
export function useAuth() {
    return useContext(Context);
}

const auth = getAuth();

export default function AuthContext({ children }) {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    try{
       signInWithEmailAndPassword(email, password);
    }catch(err){console.log(err)}
  }
  function logout() {
    return auth.signOut();
  }
  async function popup() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  }

  async function reset(email){
    try{
      await sendPasswordResetEmail(auth, email);
      dispatch(passwordReset(false))
      alert(`Password recovery link has been sent to the ${email}`);
    }catch(er){
      alert(er.messaage);
    }

  }
  

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
     
    });
    return () => unsub();
  });

  const value = {
    currentUser,
    login,
    signup,
    logout,
    popup,
    reset
  };

  return (
    <Context.Provider value={value}>
      {!loading && children}
    </Context.Provider>
  );
}

AuthContext.propTypes = {
    children: PropType.node
}
