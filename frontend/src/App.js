import logo from "./logoWhite.png";
import './App.scss';
// import EthConnector from './EthConnector';
import {FaQuestionCircle} from "react-icons/fa";
import React, { useState } from "react";
const CREATE_VIEW = "create_view";
const FREEZER_VIEW = "FREEZER_view";

const formSubmitHandler = () => { alert("coming soon!")}

function App() {
  const [view, setView] = useState(CREATE_VIEW);
  const [freezers, setFreezers] = useState([{balance: 12.4},{balance: 1.3},]);

  return (
    <div className="deepfreeze-root">
      <div className="light-section">
        <div className="logo">
          <img src={logo} alt="Deep Freeze Logo"/>
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
                  {freezers.map((freezer) => (
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
                  ))}
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
