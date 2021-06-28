import React from "react";

import Account from "./types/Account";
import AccountDetails from "./components/AccountDetais";
import BalanceDetails from "./components/BalanceDetails";

import "./App.css";

const App = () => {
  const [account, setAccount] = React.useState<Account>();

  const renderContent = () => {
    const hasMetamask = window.ethereum && window.ethereum.isMetaMask;
    if (!hasMetamask) {
      return (
        <pre>You need to install Metamask in your browser for this to work</pre>
      );
    }

    return (
      <>
        <AccountDetails
          account={account}
          updateAccount={(account) => setAccount(account)}
        />
        <BalanceDetails account={account} />
      </>
    );
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
};

export default App;
