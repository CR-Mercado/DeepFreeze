# DeepFreeze dAPP

DeepFreeze V0

# Workflow

There is 2 distinct contract, the DeepFreeze (that will be individual to user) and the DeepFreezeFactory that will deployed new Freezer.

DeepFreezeFactory is the contract called by the User, the contract call the method CreateFreezer and take as input a password and a hint. Then the Factory mapp the new freezer to the User. 

User can deposit fund to the freezer, request the hint, modify hint ans password.


# Instructions

You need to have a .env file containing : 


``` 
export PRIVATE_KEY="Your Key"
export WEB3_INFURA_PROJECT_ID="YourInfuraKey"
export ETHERSCAN_TOKEN="Your token" (if you want to verify the contract)

```

1) In order to deploy the DeepFreezeFactory, it is needed to deploy a Freezer template
run ``` brownie run scripts/deploy_DeepFreeze.py --network kovan ```

2) If you need the ABI of the contracts (already present in the repo), run ``` brownie run scripts/get_ABI.py ```

At this point, the factory is deployed and you can call the CreateFreezer method to deployed new freezers.
DeepFreezeFactory is already deployed on kovan testnet (``` 0x84BeC65FAdd027f86A4D20058A5FBE12EC4362DA ```) or rinkeby testnet(``` 0xE8E5C8999BAB7BA84e066F4F105A4728e5C58B45 ```)


3) If you want to deploy a test freezer run ``` brownie run scripts/createFreezer.py --network kovan ```

# Dependencies
 - python3 
 - brownie
 - ganache-cli

