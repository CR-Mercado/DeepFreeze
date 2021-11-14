// TODO make this a button to connect wallet
// TODO look up syntax for non-etherium chains and make this connector code generic

const Web3 = require("web3");
var web3;
const isWalletConnected = async () => { 
  if (window.ethereum && web3) {
    return true;
  } 
  return false; 
}

const init = async () => {
    await window.ethereum.send('eth_requestAccounts'); 
    web3 = new Web3(window.ethereum);
    return web3;
};
const getWeb3 = () => web3;


const exports = {
    getWeb3,
    init,
    isWalletConnected,
};

export default exports;