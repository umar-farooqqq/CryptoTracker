import React, { useContext, useState, useEffect } from "react";
import { CoinContext } from "../context/CoinContext.jsx";
import { Link } from "react-router";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="p-2 sm:p-4 md:p-6 pb-[100px]">
      <div className="max-w-[600px] m-auto flex flex-col items-center text-center gap-6 sm:gap-8">
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold pt-6 sm:pt-10">
          Largest
          <br /> Crypto MarketPlace
        </h1>
        <p className="text-[#e3e3e3] text-base sm:text-lg md:text-xl">
          Welcome to the World's largest CryptoCurrency MarketPlace. Sign up to
          explore more about Cryptos.
        </p>
        <form
          onSubmit={searchHandler}
          className="p-2 w-full sm:w-[80%] bg-white flex flex-col sm:flex-row justify-between items-center gap-2 border-2 border-black rounded-xl"
        >
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search Crypto..."
            required
            className="flex-1 pl-2 text-base outline-none w-full"
          />

          <datalist id="coinlist">
          {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
          </datalist>

          <button
            type="submit"
            className="w-full sm:w-auto cursor-pointer border-none bg-slate-700 text-white px-2 py-1 rounded-xl hover:bg-slate-800 transition-all duration-300"
          >
            Search
          </button>
        </form>
      </div>

      <div className="cryptotable w-full md:max-w-[800px] m-auto bg-slate-600 rounded-xl shadow-lg shadow-black mt-10">
        <div className="w-full grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] px-2 md:px-4 py-3 md:py-4 items-center border-b border-red-800 text-white text-base font-medium">
          <p>#</p>
          <p>Coins</p>
          <p className="">Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right hidden md:block">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} key={index}>
          <div
            className="w-full grid grid-cols-[0.5fr_3fr_1fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] px-2 md:px-4 py-3 md:py-4 items-center border-b border-red-800 text-white last:border-b-0 text-base"
            key={index}
          >
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-2">
              <img src={item.image} alt="" className="w-8 md:w-10" />
              <p className="truncate">{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={`text-center ${
                item.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="text-right hidden md:block">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
