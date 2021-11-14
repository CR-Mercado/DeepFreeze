// from a4dab5b233dbe370778e9645fdd996c8042937e5
// TODO make this a relative reference to a JSON file and use webpack to bundle. this will 

export default {
    address: "0x0", // TODO
    abi: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "User",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "FreezerAddress",
                    "type": "address"
                }
            ],
            "name": "FreezerCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "name": "_templateDeepFreeze",
                    "type": "address"
                }
            ],
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "gas": 92235,
            "inputs": [
                {
                    "name": "_answer",
                    "type": "bytes32"
                },
                {
                    "name": "_hint",
                    "type": "string"
                }
            ],
            "name": "createFreezer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "gas": 1528,
            "inputs": [
                {
                    "name": "_User",
                    "type": "address"
                }
            ],
            "name": "getFreezerByAddress",
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
            "gas": 1286,
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
            "gas": 1588,
            "inputs": [
                {
                    "name": "arg0",
                    "type": "address"
                }
            ],
            "name": "DeployedFreezer",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};