import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CoinContext } from "../context/CoinContext.jsx";
import LineChart from "../components/LineChart.jsx";

const Coin = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-3cJsZkZZoMXMc7P33LQDBk2E",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-3cJsZkZZoMXMc7P33LQDBk2E",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin p-[0_20px]">
        <div className="coin-name flex flex-col items-center gap-[20px] m-[100px] mb-[50px]">
          <img src={coinData.image.large} alt="" className="max-w-[100px]" />
          <p className="text-4xl">
            <b className="text-white">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coinChart max-w-[600px] h-[250px] m-auto">
          <LineChart endpoint={historicalData} />
        </div>

        <div className="coinDetails text-white max-w-[600px] flex flex-col mx-auto mt-[40px] mb-[100px]">
          <ul className="flex justify-between p-[10px_0px] border-b-[1px] border-[#5f5d5f] list-none">
            <li className="font-mono text-lg">Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className="flex justify-between p-[10px_0px] border-b-[1px] border-[#5f5d5f] list-none">
            <li className="font-mono text-lg">Current Price</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.current_price?.[currency.name]?.toLocaleString() || "N/A"}
            </li>
          </ul>
          <ul className="flex justify-between p-[10px_0px] border-b-[1px] border-[#5f5d5f] list-none">
            <li className="font-mono text-lg">Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.market_cap?.[currency.name]?.toLocaleString() || "N/A"}
            </li>
          </ul>
          <ul className="flex justify-between p-[10px_0px] border-b-[1px] border-[#5f5d5f]  list-none">
            <li className="font-mono text-lg">24H High</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.high_24h?.[currency.name]?.toLocaleString() || "N/A"}
            </li>
          </ul>
          <ul className="flex justify-between p-[10px_0px] border-b-[1px] border-[#5f5d5f] list-none">
            <li className="font-mono text-lg">24H Low</li>
            <li>
              {currency.symbol}{" "}
              {coinData.market_data.low_24h?.[currency.name]?.toLocaleString() || "N/A"}
            </li>
          </ul>

        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner min-h-[80vh] flex items-center justify-center">
        <div className="w-[70px] h-[70px] border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
};

export default Coin;
