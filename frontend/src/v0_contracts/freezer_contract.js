// from a4dab5b233dbe370778e9645fdd996c8042937e5
// TODO make this a relative reference to a JSON file and use webpack to bundle. this will 

export default {
        address: "0x0", // TODO
        abi: [{
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "FreezerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "initialized",
                    "type": "bool"
                }
            ],
            "name": "FreezerInitialized",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "PasswordChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "HintChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "FreezerAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "From",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "AmountDeposited",
                    "type": "uint256"
                }
            ],
            "name": "FundDeposited",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "FreezerAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "From",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "AmountWithdrawed",
                    "type": "uint256"
                }
            ],
            "name": "FundWithdrawed",
            "type": "event"
        },
        {
            "gas": 273789,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_password",
                    "type": "bytes32"
                },
                {
                    "name": "_hint",
                    "type": "string"
                }
            ],
            "name": "initializeFreezer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "gas": 7689,
            "inputs": [],
            "name": "requestHint",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "gas": 2232,
            "inputs": [],
            "name": "requestAnswer",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "gas": 76745,
            "inputs": [
                {
                    "name": "_hint",
                    "type": "string"
                }
            ],
            "name": "changeHint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "gas": 38871,
            "inputs": [
                {
                    "name": "_oldPassword",
                    "type": "bytes32"
                },
                {
                    "name": "_newPassword",
                    "type": "bytes32"
                }
            ],
            "name": "changePassword",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "gas": 3773,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "gas": 102166,
            "inputs": [
                {
                    "name": "_password",
                    "type": "string"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "gas": 1436,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "gas": 1466,
            "inputs": [],
            "name": "launchblock",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};