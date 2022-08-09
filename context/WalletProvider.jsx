import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
// import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const connectWallet = async (browserWindow) => {
    if (browserWindow && typeof browserWindow.ethereum) {
      browserWindow.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      console.log("No metamask!");
    }
  };

  const memoizedState = useMemo(() => ({
    connectWallet,
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
