import { useDispatch, useSelector } from "react-redux";
import { emailChanged, resetCheck } from "../../redux/feature/userCred/UserCredsSlice";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import './Reset.css'

export default function Reset() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signup.email);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`password recovery link sent`);
      dispatch(resetCheck());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="password-reset-panel">
      <span>RESET</span>
      <input
        type="email"
        onChange={(e) => {
          dispatch(emailChanged(e.target.value));
        }}
        placeholder="Email"
        id="recovery-email"
      />
      <button
        className="reset-password-button"
        onClick={(e) => {
          handleReset(e);
        }}
      >
        reset
      </button>
      <p onClick = {(e) => {
        e.preventDefault();
        dispatch(resetCheck())
      }}>login</p>
    </div>
  );
}

