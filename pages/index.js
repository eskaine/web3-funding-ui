import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWalletContext } from "../context/WalletProvider";

const Home = () => {
  const [browserWindow] = useState(null);
  const { connectWallet } = useWalletContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("windows");
      browserWindow = window;
    }
  }, []);

  return (
    <div className={styles.container}>
      <button
        id="connectButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={() => connectWallet(browserWindow)}
      >
        Connect Metamask
      </button>
    </div>
  );
};

export default Home;
