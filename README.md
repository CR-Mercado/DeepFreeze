# DeepFreeze
 Uses a Commit/Hint/Reveal Scheme to "deep freeze" assets without hardware. 

# Design

1. You provide a hint (to your future self) + the keccak hash of the human readable answer. 
2. You add assets (only ETH as currently written, fork as you see fit and modify).
3. The assets are locked away in the smart contract until the *contract owner* calls *withdraw* with the human readable answer as input data.

Keccak 256 calculators are freely available online, for example [https://emn178.github.io/online-tools/keccak_256.html](https://emn178.github.io/online-tools/keccak_256.html). 

4. The contract will then selfdestruct, making the burn address (0x000...000) the new owner and sending its entire balance to the owner. Any ETH sent to the self destructed contract is **burned**. Don't throw away money. This is done because input data is on-chain and thus your withdawal compromises the contract.

# Details / Proof of Concept

Read the [Deep_Freeze presentation here](https://github.com/CR-Mercado/DeepFreeze/blob/main/Deep_Freeze.pdf). In hindsight, this is not that different from regular passwords, except that its decentralized. But you can get creative with your hints and answers.