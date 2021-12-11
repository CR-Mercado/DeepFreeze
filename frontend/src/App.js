import React, { useState } from "react";

import logo from "./logoWhite.png";
import {FaQuestionCircle} from "react-icons/fa";
import './App.scss';

import {
  getAccounts,
  getAccountBalance,
  getContract,
  init,
} from './EthConnector';
import v0factoryABI from "./abis/v0factoryABI";
import v0freezerABI from "./abis/v0freezerABI";

const CREATE_VIEW = "create_view";
const FREEZER_VIEW = "FREEZER_view";

const formSubmitHandler = () => { alert("coming soon!")}

let freezerFactoryContract, freezerContract;

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState("");
  const [view, setView] = useState(CREATE_VIEW);
  const [freezers, setFreezers] = useState([]);


  async function connectWallet() {
    try {
      const debugWeb3 = await init();
      const accounts = await getAccounts();
      const account = accounts[0];

      setConnectedAccountAddress(account);
      await createContractInterfaces();
          
      window.debugWeb3 = debugWeb3; // for console debugging
    } catch (err) {
      console.error(err);
      window.alert("Wallet connection failed."); // remove if annoying. TODO replace with html popup
      throw new Error("Wallet connection failed.");
    }
  }

  async function createContractInterfaces() {
    freezerFactoryContract = await getContract(v0factoryABI);    
    freezerContract = await getContract(v0freezerABI);    

    window.debugFactoryContract = freezerFactoryContract;  // for console debugging
    window.debugFreezerContract = freezerContract; // for console debugging
  }

  return (
    <div className="deepfreeze-root">
      <div className="light-section">
        <div className="logo">
          <img src={logo} alt="Deep Freeze Logo"/>
        </div>
        <div className="wallet-info">
          <span>{connectedAccountAddress}</span>
          <button className="connect-wallet" onClick={connectWallet}>Connect wallet</button>
        </div>
        <div className="form" onSubmit={formSubmitHandler}>
          <tabs>
            <tab onClick={() => setView(CREATE_VIEW)} className={view === CREATE_VIEW ? "selected" : ""}>Create freezer</tab>
            <tab onClick={() => setView(FREEZER_VIEW)} className={view === FREEZER_VIEW ? "selected" : ""}>My freezers</tab>
          </tabs>
          <form className={view}>
            {
              view === CREATE_VIEW ? (
                <React.Fragment>                  
                  <input name="hint" placeholder="Hint (optional)" type="text" maxLength="160" required/>
                  <input name="password" placeholder="Hashed password" type="password" required />
                  <div className="howToHash"><FaQuestionCircle/>&nbsp;<a href="#todo">How to securely hash your password</a></div>
                  <button className="submit" type="submit">Create freezer</button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {freezers?.length > 0 ?
                    freezers.map((freezer) => (
                      <freezer>
                        <div>   
                          {/*TODO currency icons */}                     
                          <h2>{freezer.balance || "error"}</h2>                  
                          <button className="withdrawButton">Withdraw all</button>
                        </div>
                        <div>
                          {/*TODO currency icons */}
                          <input className="depositAmount" name="depositAmount" placeholder="Amount" type="number"/>
                          <button className="depositButton">Deposit</button>
                        </div>
                      </freezer>
                    ))
                    :
                    <h3>You have no freezers yet.</h3>
                  }
                </React.Fragment>
              )
            }        
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
