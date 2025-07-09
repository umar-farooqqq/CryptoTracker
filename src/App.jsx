import React from "react";
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className=" w-full min-h-screen bg-gradient-to-b from-blue-500 to-blue-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<Coin />} />
        
      </Routes >  
      <Footer />
    </div>
  );
};

export default App;
