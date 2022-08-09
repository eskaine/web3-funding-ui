import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWalletContext } from "../context/WalletProvider";

const Home = () => {
  const { connectWallet, addFundings, getEthereumObj, setEthereumObj } =
    useWalletContext();
  const [funds, addFunds] = useState(0);

  useEffect(() => {
    let ethereum = getEthereumObj();

    if (!ethereum && typeof window.ethereum !== "undefined") {
      ethereum = window.ethereum;
    }

    setEthereumObj(ethereum);
  }, []);

  return (
    <div className={styles.container}>
      <button
        id="connectButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={() => connectWallet()}
      >
        Connect Metamask
      </button>
      <button
        id="fundButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={() => addFundings(funds)}
      >
        Add Funds
      </button>
    </div>
  );
};

export default Home;
