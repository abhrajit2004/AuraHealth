import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

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
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div className="my-4 flex flex-col items-center">
          <img
            className="rounded-full"
            src={profile.picture}
            alt="user image"
          />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button
            className="bg-red-500 p-2 rounded-md text-white"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="my-4 flex flex-col items-center">
          <h2 className="text-4xl text-center font-bold">
            Get Started with AuraHealth today!
          </h2>
          <button
            className="bg-slate-800 text-white p-2 rounded-md my-4"
            onClick={login}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
