import GoogleSignin from "./components/GoogleSignin";
import Hero from "./components/Hero";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<GoogleSignin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
export default App;
