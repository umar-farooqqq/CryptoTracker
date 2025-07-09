import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext.jsx";
import { Link } from "react-router";

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "pkr":
        setCurrency({ name: "pkr", symbol: "₨" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
    }
  }

  return (
    <div className="flex justify-between items-center p-4 border-b 2px solid #3c3c3c sm:gap-10 md:gap-10 lg:gap-20 font-semibold font-sans">
      <Link to={`/`}><img src="/logo.png" alt="logo" /></Link>
      <ul className="text-white hidden md:flex justify-between items-center gap-10 lg:gap-20">
        <Link to={`/`}><li className="hover:text-gray-200 cursor-pointer">Home</li></Link>
        <li className="hover:text-gray-200 cursor-pointer">Features</li>
        <li className="hover:text-gray-200 cursor-pointer">Pricing</li>
        <li className="hover:text-gray-200 cursor-pointer">Blog</li>
      </ul>
      <div className="flex justify-between items-center gap-4">
        <select onChange={currencyHandler} className="cursor-pointer bg-transparent border-2 border-white rounded-xl p-1 hover:bg-white">
          <option value="usd"> USD </option>
          <option value="eur"> EUR </option>
          <option value="pkr"> PKR </option>
        </select>
        <button className="text-white cursor-pointer border-2 border-white rounded-xl p-1 hover:bg-white hover:text-black">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
