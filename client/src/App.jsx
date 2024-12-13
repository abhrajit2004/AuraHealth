import GoogleSignin from "./components/GoogleSignin";
import Hero from "./components/Hero";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<GoogleSignin />} />
      </Routes>
    </>
  );
}
export default App;
