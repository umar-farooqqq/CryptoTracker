import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CoinContext } from "../context/CoinContext.jsx";

const Coin = () => {

  const { id } = useParams();
  const [coinData, setCoinData] = useState();
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

  useEffect(() => {
      fetchCoinData();
    }, [currency]);

  return (
    <div className="">
      <div>
        <img src={coinData?.image.large} alt="" />
        <p>
          <b>{coinData?.name} ({coinData?.symbol.toUpperCase()})</b>
        </p>
      </div>
    </div>
  );
};

export default Coin;
