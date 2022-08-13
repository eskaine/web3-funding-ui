import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWalletContext } from "../core/context/WalletProvider";

const Home = () => {
  const {
    account,
    connectWallet,
    addFundings,
    getEthereumObj,
    setEthereumObj,
  } = useWalletContext();
  const [funds, addFunds] = useState(0);

  const connectWalletClickHandler = () => {
    connectWallet();
  };

  const addFundingsClickHandler = () => {
    addFundings(funds);
  };

  const fundsOnChangeHandler = (e) => {
    addFunds(e.target.value);
  };

  useEffect(() => {
    let ethereum = getEthereumObj();

    if (!ethereum && typeof window.ethereum !== "undefined") {
      ethereum = window.ethereum;
    }

    setEthereumObj(ethereum);
  }, []);

  return (
    <div className={styles.container}>
      {!account ? (
        <button
          id="connectButton"
          className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
          onClick={connectWalletClickHandler}
        >
          Connect Metamask
        </button>
      ) : (
        <button className="rounded-full bg-green-500 text-white font-bold py-2 px-4">
          Connected
        </button>
      )}

      <button
        id="fundButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={addFundingsClickHandler}
      >
        Add Funds
      </button>
      <label for="fund">ETH Amount</label>
      <input id="ethAmount" placeholder="0.1" onChange={fundsOnChangeHandler} />
    </div>
  );
};

export default Home;
