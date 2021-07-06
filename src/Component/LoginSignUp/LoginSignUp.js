import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config.js';
import { userContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

// ---------- loginSignup ------------
const LoginSignUp = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const [signUp, setSignUp] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    })
    // -------- continue with google -------
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                const userDetail = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(userDetail);
                setLoggedInUser(userDetail)
                history.replace(from);
                // console.log("google sign in result", result)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }

    // -------- handleBlur ----------
    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const passLength = e.target.value.length >= 6;
            const passNum = /\d{1}/.test(e.target.value)
            isFieldValid = (passLength && passNum)
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    // -------- handleSubmit ---------
    const handleSubmit = (e) => {
        if (signUp && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    upDateUserName(user.name)
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                    console.log(newUserInfo)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!signUp && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                    console.log(newUserInfo)
                    console.log('user info', res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const upDateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then((res) => {
            console.log('user name update successfully')
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="login-signup">
            {/* ------ from ----- */}
            <form className="from" onClick={handleSubmit}>
                {
                    signUp ? <p>signUp</p> : <p>login</p>
                }
                {
                    signUp &&
                    <input className="input" type="text" name="name" placeholder="Name" onBlur={handleBlur} required />
                }
                <input className="input" type="text" name="email" placeholder="Email Address" onBlur={handleBlur} required />
                <input className="input" type="password" name="password" placeholder="Password" onBlur={handleBlur} required />
                {
                    signUp ?
                        <input className="submit" type="submit" value="signUp" /> :
                        <input className="submit" type="submit" value="login" />
                }
            </form>
            {/* -------form ------- */}
            <div className="toggle">
                {
                    signUp ?
                        <div>
                            <span>all ready have an account? </span>
                            <button className="toggle-btn" onClick={() => setSignUp(!signUp)}>login</button>
                        </div> :
                        <div>
                            <span>don't have an account? </span>
                            <button className="toggle-btn" onClick={() => setSignUp(!signUp)}>signUp</button>
                        </div>
                }
            </div>


            <p className="error">{user.error}</p>
            {
                user.success && <p className="success">user {signUp ? "created successfully login please" : "logged In successfully"}</p>
            }

            <p style={{ textTransform: "capitalize" }}>or sign up with</p>
            <button className="google-btn" onClick={handleGoogleSignIn}><FcGoogle className="react-icon-g" />continue with google</button>
        </div>
    );
};

export default LoginSignUp;