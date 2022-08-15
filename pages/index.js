import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWalletContext } from "../core/context/WalletProvider";
import FundsComponent from "./components/FundsComponent";

const Home = () => {
  const { account, connectWallet, getEthereumObj, setEthereumObj } =
    useWalletContext();

  const connectWalletClickHandler = () => {
    connectWallet();
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
        <FundsComponent />
      )}
    </div>
  );
};

export default Home;
