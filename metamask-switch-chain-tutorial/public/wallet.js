const goerliChainId = 5;
const polygonChainId = 137;

const initialize = () => {
    let web3;
    connect = async() => {
        const {ethereum} = window;
        if(ethereum) {
            console.log("ethreum provider detected");
            await ethereum.request({method: 'eth_requestAccounts'});
            web3 = new Web3(ethereum);
            await switchNetwork(polygonChainId);
        }
    }

    getCurrentChainId = async () => {
        const currentChainId = await web3.eth.getChainId();
        console.log("current chainId:", currentChainId);
        return currentChainId;
    }

    switchNetwork = async (chainId) => {
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId != chainId){
            try {
                await web3.currentProvider.request({
                    method:'wallet_switchEthereumChain',
                    params: [{chainId: Web3.utils.toHex(chainId)}]
                });
                console.log(`switched to chainid : ${chainId} succesfully`);
            }catch(err){
                console.log(`error occured while switching chain to chainId ${chainId}, err: ${err.message} err: ${err.code}`);
                if (err.code === 4902){
                    addNetwork(polygonNetwork);
                }
            }
        }
    }

    const polygonNetwork = {
        chainId:Web3.utils.toHex(polygonChainId),
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC", // 2-6 characters long
          decimals: 18
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls:["https://polygonscan.com/"]
    }

    addNetwork = async(networkDetails) => {
        try{
            await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    networkDetails
                ]
              });
        }catch(err){
            console.log(`error ocuured while adding new chain with chainId:${networkDetails.chainId}, err: ${err.message}`)
        }
    }
    
    connect();
}

window.addEventListener('DOMContentLoaded', initialize);