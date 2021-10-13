import { createRequire } from "module"; // add the ability to construct the'require' method in js file
const require = createRequire(import.meta.url); // construct the require method
require("dotenv").config();
const Web3 = require("web3");
const client = require("node-rest-client-promise").Client();
const fs = require("fs"); //require file system methods
const ObjectsToCsv = require("objects-to-csv");
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_KEY}`
    )
);
const API_URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${process.env.TREASURE_FARM}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;

// get temp.json file save it as events
//events = require("./temp.json");
let transactions = [];

async function getContractAbi() {
    const ETHERSCAN_RESPONSE = await client.getPromise(API_URL);
    const CONTRACT_ABI = ETHERSCAN_RESPONSE.data.result;
    (async () => {
        let nameTime = (new Date()).toString();
        fs.writeFile(
            `./temp-${nameTime}.json`,
            JSON.stringify(CONTRACT_ABI, null, "  "),
            (err) => {
                //json stingify's third argument is the indentation for JSON file
                if (err) throw err;
                console.log(
                    "The Etherscan response has been saved in json in api-responses !"
                ); //saves and updates temp-results.json
            }
        );
        })();
    return CONTRACT_ABI;
}

async function queryEvents() {
    await getContractAbi()
        .then((events) => {
                /*  in the treasure farm contract:
                from this transaction api that gives a list of transactions like this:
                            {
                "blockNumber": "13266215",
                "timeStamp": "1632188650",
                "hash": "0x251f367ac677d8f37de886cc71f41380891600873b98489c5bc9bdf79cc08831",
                "nonce": "73",
                "blockHash": "0x3ae7cac5a7e18d493c9d13eeab8aefdd4f908b9d249e17b0742a297342faab8e",
                "transactionIndex": "52",
                "from": "0x90d94d98dcb39342aec485b7cef1c63f1c876c7c",
                "to": "0x07edbd02923435fe2c141f390510178c79dbbc46",
                "value": "0",
                "gas": "115630",
                "gasPrice": "125637479641",
                "isError": "0",
                "txreceipt_status": "1",
                "input": "0xa694fc3a0000000000000000000000000000000000000000000005138f94c8b3aa513418",
                "contractAddress": "",
                "cumulativeGasUsed": "5516502",
                "gasUsed": "110830",
                "confirmations": "94118"
                
                I need to see all of the deposit transactions, like what tokenids and amount they're transferring into the contract etc.
                I also need to see all of the withdrawl transactions
                then I need you to figure out which deposits aren't paired w withdrawals*/
                //parse the transactions to find out which ones are deposits and which ones are withdrawls
                //then I need to figure out which deposits aren't paired w withdrawals

                for (let i = 0; i < events.length; i++) {
                    if (events[i].from != process.env.TREASURE_FARM) {
                        let singleTransaction = {
                            address: events[i].from,
                        }
                        transactions.push(singleTransaction);
                    }
            
                




    
            }
            (async () => {
                //write apiObj result to json File
                fs.writeFile(
                    "./temp-results/temp-results.json",
                    JSON.stringify(transactions, null, "  "),
                    (err) => {
                        //json stingify's third argument is the indentation for JSON file
                        if (err) throw err;
                        console.log(
                            "The file has been saved in json in temp-results.json!"
                        ); //saves and updates temp-results.json
                    }
                );
                })();

            (async () => {
                let csv = new ObjectsToCsv(transactions);
                await csv.toDisk("./temp-results/temp-results.csv", {
                    allColumns: true,
                });
                console.log(
                    "The file has been saved in csv in temp-results.csv!"
                ); //saves and updates temp-results.csv
            })();
        })
        .catch(function (err) {
            console.log(err);
        });
}
queryEvents();


