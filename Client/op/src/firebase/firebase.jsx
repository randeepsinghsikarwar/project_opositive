import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyBk8S1xaoQK3u7pzRVTWYGKr_8zbpGJEpU",
    authDomain: "opositive-7486a.firebaseapp.com",
    projectId: "opositive-7486a",
    storageBucket: "opositive-7486a.appspot.com",
    messagingSenderId: "1005068249966",
    appId: "1:1005068249966:web:b0d964a5b81947da9f6f7f",
    measurementId: "G-CLZD49WNND"
});

const auth = getAuth(app);

export { auth, app };

export const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return auth.signOut()
}

export const signUpWithGoogle =  async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    }catch (error) {
        console.error(error)
    }
}

export const loginWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)   
}
