import React from "react";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const GoogleSigninPage = () => {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
        window.location.href = '/dashboard'; // Redirect to dashboard
    }
  }, [window.location]);


  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem('user', JSON.stringify(res.data)); // Store user data
          window.location.href = '/dashboard'; // Redirect to dashboard
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    localStorage.removeItem('user'); // Remove user data on logout
    setProfile(null);
    window.location.href = '/'; // Redirect to home
  };
  return (
    <>
        <Navbar />
        <div>
        
            <div className="my-4 flex flex-col items-center">
            <h2 className="text-4xl text-center font-light">
                Signup to Get Started with AuraHealth today!
            </h2>

            <button
                className="bg-slate-800 text-white p-2 rounded-md my-4"
                onClick={login}
            >
                <FcGoogle className="text-2xl inline mx-2" />
                {"  "} Sign in with Google
            </button>

            <img
                src="https://plus.unsplash.com/premium_vector-1727145436438-5c17ea18923a?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="auth-image"
                className=" object-contain w-1/2 rounded-2xl my-4"
            />
            </div>
        
        </div>
    </>
  );
};

export default GoogleSigninPage;