import { useState } from "react";
import { useWalletContext } from "../../core/context/WalletProvider";

const FundsComponent = () => {
  const { addFundings, withdrawBalance } = useWalletContext();
  const [funds, addFunds] = useState(0);

  const addFundingsClickHandler = () => {
    addFundings(String(funds));
  };

  const withdrawClickHandler = () => {
    withdrawBalance();
  };

  const fundsOnChangeHandler = (e) => {
    addFunds(e.target.value);
  };

  return (
    <div>
      <button className="rounded-full bg-green-500 text-white font-bold py-2 px-4">
        Connected
      </button>

      <button
        id="fundButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={addFundingsClickHandler}
      >
        Add Funds
      </button>

      <button
        id="withdrawButton"
        className="rounded-full bg-indigo-500 text-white font-bold py-2 px-4"
        onClick={withdrawClickHandler}
      >
        Withdraw
      </button>
      <label for="fund">ETH Amount</label>
      <input id="ethAmount" placeholder="0.1" onChange={fundsOnChangeHandler} />
    </div>
  );
};

export default FundsComponent;
