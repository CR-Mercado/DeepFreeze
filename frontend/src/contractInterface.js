// an interface to the web 3 js contract objects. handles type conversion, errors, etc 
// so that the front end doesn't need to know about blockchain concepts. it can just call these plain functions

const FREEZER_FETCH_BATCH_SIZE = 5; // solidity is obnoxious sometimes. you can't fetch dynamic sized arrays, so we try to fetch the data X at a time, until we hit the first error and give up (testing for out of bounds, essentially)
const MAX_LIVE_FREEZERS = 20; // don't fetch or display more than X freezes on the UI

export default function createContractInterface(web3, freezerFactoryContract, freezerContract, sendAddress) {
    // throw these into a closure

    return {
        createFreezer: async (hint, password) => {
            //todo            
        },
        getFreezer: async (index) => {            
            const freezerAddress = await freezerFactoryContract.methods.userFreezer(sendAddress, index).call({from: sendAddress});
            return freezerAddress;
        },
        getFreezers: async () => {
            let freezerAddressesToReturn = [];          

            while(freezerAddressesToReturn.length < MAX_LIVE_FREEZERS) { // could be `while(true)`, but this prevents unlikely infinite loop error cases where web 3 js isn't throwing errors on failed calls
                const pendingRequests = (new Array(FREEZER_FETCH_BATCH_SIZE)).map((val, index) => {
                    return this.getFreezer(index);
                }).catch(setNullIfError); // e.g. [this.getFreezer(0), this.getFreezer(1), this.getFreezer(2)] if FREEZER_FETCH_BATCH_SIZE is 3
                
                const resolvedRequests = await Promise.all([
                    ...pendingRequests
                ]);

                const freezerAddresses = resolvedRequests.filter((val) => val !== null); // remove failed calls (index out of bounds), denoted by null values
                const liveFreezers = freezerAddresses.filter(await Promise.all([
                    [...freezerAddresses].map(isFreezerLive) // e.g. [this.isFreezerLive("0x70F00..."), this.isFreezerLive("0x21FA0..."), this.isFreezerLive("0x10C40...")]
                                                             // will return: [true, true, false], indicating: ["live", "live", "destroyed"]
                ])); // gotta ask one at a time. 
            }
            // filter out "dead" freezers
        },

        // freezer methods
        getBalance: async (freezerAddress) => {
            // todo
        },
        deposit: async (freezerAddress, amountInEth) => {
            // todo
        },
        withdraw: async (freezerAddress, unhashedPassword) => {
            // todo
        },        
        isFreezerLive: async (freezerAddress) => {
            // todo
            // freezerOwner == 0x0 ? true : false
        },
        requestHint: async (freezerAddress) => {
            // todo
        },
        requestHashedPassword: async (freezerAddress) => {
            // todo
        },

    };
};

const setNullIfError = () => null