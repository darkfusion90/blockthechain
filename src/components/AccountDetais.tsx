import React from "react";
import web3 from "web3";
import Account from "../types/Account";

interface IAccountDetailsProps {
  updateAccount: (account: Account) => void;
  account: Account;
}

const AccountDetais: React.FC<IAccountDetailsProps> = ({
  updateAccount,
  account,
}) => {
  const [error, setError] = React.useState<any>();

  const connectMetamask = async () => {
    try {
      const acc = await web3.givenProvider.request({
        method: "eth_requestAccounts",
      });
      updateAccount(acc);
    } catch (e) {
      setError(e);
    }
  };

  const renderAccount = () => {
    if (account) {
      return <pre>{account}</pre>;
    }

    return <pre>You have not connected an account yet</pre>;
  };

  const renderConnectBtn = () => {
    const content = account
      ? "Reconnect to account"
      : "Click here to connect an account";

    return <button onClick={connectMetamask}>{content}</button>;
  };

  const renderError = () => {
    if (error) {
      return <p className="error-msg">{error.message}</p>;
    }
  };

  return (
    <div className="section">
      <h1>Your Account address</h1>
      {renderAccount()}
      {renderError()}
      {renderConnectBtn()}
    </div>
  );
};

export default AccountDetais;
