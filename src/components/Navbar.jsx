import React, { useContext } from "react";
import { CoinContext } from "../context/CoinContext.jsx";
import { Link } from "react-router";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

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
  };

  return (
    <div className="flex justify-between items-center p-4 border-b 2px solid #3c3c3c sm:gap-10 md:gap-10 lg:gap-20 font-semibold font-sans sticky top-0 z-50 bg-blue-600">
      <Link to={`/`}>
        <img src="/logo.png" alt="logo" className="w-[120px] md:w-40 lg:w-full" />
      </Link>
      <ul className="text-white hidden md:flex justify-between items-center gap-10 lg:gap-20">
        <Link to={`/`}>
          <li className="hover:text-gray-200 cursor-pointer">Home</li>
        </Link>
        <li className="hover:text-gray-200 cursor-pointer">Features</li>
        <li className="hover:text-gray-200 cursor-pointer">Pricing</li>
        <li className="hover:text-gray-200 cursor-pointer">Blog</li>
      </ul>
      <div className="flex justify-between items-center gap-4">
        <select
          onChange={currencyHandler}
          className="cursor-pointer bg-white text-black border-2 border-white rounded-xl p-1  shadow-sm"
        >
          <option value="usd" className="bg-white text-black">
            USD ($)
          </option>
          <option value="eur" className="bg-white text-black">
            EUR (€)
          </option>
          <option value="pkr" className="bg-white text-black">
            PKR (₨)
          </option>
        </select>
        <button className="text-white cursor-pointer border-2 border-white rounded-xl p-1 hover:bg-white hover:text-black">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
