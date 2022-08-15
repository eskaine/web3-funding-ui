import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ethers } from "../../utils/ethers.min";
import { abi, contractAddress } from "../helpers/constants";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [ethObj, setEthObj] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = () => {
    walletHandler(async () => {
      const account = await ethObj.request({
        method: "eth_requestAccounts",
      });

      if (account.length == 1) {
        setAccount(account[0]);
      }
    });
  };

  const addFundings = (ethAmount) => {
    walletHandler(async (provider, contract) => {
      try {
        const txResponse = await contract.fund({
          value: ethers.utils.parseEther(ethAmount),
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  const getBalance = async () => {
    walletHandler(async (provider, contract) => {
      const balance = await provider.getBalance(contractAddress);
      console.log(ethers.utils.formatEther(balance));
    });
  };

  const withdrawBalance = async () => {
    walletHandler(async () => {
      console.log("Withdrawing...");

      const provider = new ethers.providers.Web3Provider(ethObj);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const txResponse = await contract.withdraw();
        await txMiningListener(txResponse, provider);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const walletHandler = (callback) => {
    if (ethObj) {
      const provider = new ethers.providers.Web3Provider(ethObj);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      callback(provider, contract);
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

  const txMiningListener = (txResponse, provider) => {
    console.log(`Mining ${txResponse.hash}...`);

    return new Promise((resolve, reject) => {
      provider.once(txResponse.hash, (txReceipt) => {
        console.log(`Completed with ${txReceipt.confirmations} confirmations.`);
        resolve();
      });
    });
  };

  const memoizedState = useMemo(() => ({
    connectWallet,
    setEthereumObj,
    getEthereumObj,
    addFundings,
    getBalance,
    withdrawBalance,
    account,
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
