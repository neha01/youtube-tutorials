const Web3 = require('web3')
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'
const web3 = new Web3(web3Provider)
const contractName = 'MyNFT'
const artifactsPath = `browser/contracts/artifacts/${contractName}.json`
// Function to mint NFT
const mint = async (tokenId) => {
    try {
        const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
        const accounts = await web3.eth.getAccounts();
        const contract  = new web3.eth.Contract(metadata.abi, contractAddress)
        const tx =  await contract.methods.mint(tokenId).send({from: accounts[0],value: web3.utils.toWei("1", 'ether')});
        console.log(`Minted NFT with token ID ${tokenId}`);
        console.log(`Transaction Hash: ${tx.transactionHash}`);
    } catch (err) {
        console.log(err.message);
    }
}

// Mint NFT with token ID 1
mint(1);
