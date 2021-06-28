import React from "react";
import { ethers } from "ethers";

import Account from "../types/Account";

interface IBalanceDetailsProps {
  account: Account;
}

const BalanceDetails: React.FC<IBalanceDetailsProps> = ({ account }) => {
  const [error, setError] = React.useState<any>();
  const [balance, setBalance] = React.useState<ethers.BigNumber>();

  const getBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (account) {
        const bal = await provider.getBalance(`${account}`);
        console.log({ bal });
        setBalance(bal);
      }
    } catch (e) {
      setError(e);
    }
  };

  const renderBalance = () => {
    if (!account) {
      return <pre>Account not connected</pre>;
    }

    if (balance) {
      const userReadableBal = ethers.utils.formatUnits(balance);
      return <pre>{userReadableBal} ETH</pre>;
    }

    return <pre>Balance is unknown</pre>;
  };

  const renderBalanceBtn = () => {
    if (account) {
      return <button onClick={getBalance}>Get account balance</button>;
    }
  };

  const renderError = () => {
    if (error) {
      return <p className="error-msg">{error.message}</p>;
    }
  };

  return (
    <div className="section">
      <h1>Account Balance</h1>
      {renderBalance()}
      {renderBalanceBtn()}
      {renderError()}
    </div>
  );
};

export default BalanceDetails;
