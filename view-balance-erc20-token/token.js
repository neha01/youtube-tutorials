const Web3 = require('web3');
const API_KEY = "YOUR_API_KEY";
const provider = `https://goerli.infura.io/v3/${API_KEY}`;
const tokenContractAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const wallet = "0x023fBbaC62c04Aeb46226384a3a083EBbB62a512";
const abi = [{
    "constant": true,
    "inputs": [
        {
            "name": "_owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "name": "balance",
            "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}];

const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const contract = new web3.eth.Contract(abi, tokenContractAddress);

const getBalance = async () => {
    const res = await contract.methods.balanceOf(wallet).call();
    const format = web3.utils.fromWei(res);
    console.log(format);
}

getBalance();