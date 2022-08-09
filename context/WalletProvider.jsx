import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "../utils/ethers.min";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [ethObj, setEthObj] = useState(null);

  const connectWallet = async () => {
    walletHandler(() => {
      ethObj.request({ method: "eth_requestAccounts" });
    });
  };

  const addFundings = (ethAmount) => {
    walletHandler(() => {
      const provider = new ethers.providers.Web3Provider(ethObj);
      const signer = provider.getSigner();
    });
  };

  const walletHandler = (callback) => {
    if (ethObj) {
      callback();
    } else {
      console.log("No metamask!");
    }
  };

  const setEthereumObj = (ethereumObj) => {
    setEthObj(ethereumObj);
  };

  const getEthereumObj = () => {
    return ethObj;
  };

  const memoizedState = useMemo(() => ({
    connectWallet,
    setEthereumObj,
    getEthereumObj,
    addFundings,
  }));

  return (
    <WalletContext.Provider value={memoizedState}>
      {children}
    </WalletContext.Provider>
  );
};

WalletProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useWalletContext = () => {
  return useContext(WalletContext);
};
