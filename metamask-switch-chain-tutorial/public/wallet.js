const gorelliChainId = 5;
const polygonChainId = 137;

let web3;

const initialize = () => {
 connect = async() => {
  const { ethereum } = window;
  if (ethereum) {
    console.log("ethereum found!")
    web3 = new Web3(ethereum);
    await ethereum.enable();
    console.log("web3 current provider:", web3.currentProvider)
    await switchNetwork(polygonChainId)
  } 
}

getCurrentChainId = async () => {
  const currentChainId = await web3.eth.getChainId();
  console.log("current chain id:",currentChainId)
  return currentChainId;
}

switchNetwork = async (chainId) => {
  const currentChainId = await getCurrentChainId();
  if (currentChainId != chainId) {
    try {
      await web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
    } catch (err) {
      console.log(`error occured while swicthing chain to chainId:${chainId} , err: ${err}`)
      // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        console.log("Please add the chain to metamask")
        addNetwork(polygonNetworkDetails);
      }
    }
  }
}

const polygonNetworkDetails = {
  chainId:  Web3.utils.toHex(polygonChainId), // A 0x-prefixed hexadecimal string
  chainName: "Polygon Mainnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC", // 2-6 characters long
    decimals: 18
  },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"]
}


addNetwork = async(networkDetails) => {
  try {
    await web3.currentProvider.request({
      method: 'wallet_addEthereumChain',
        params: [networkDetails],
      });
      console.log("network added succesfully");
  } catch (err) {
    console.log(`error occured while swicthing chain to chainId:${networkDetails.chainId} , err: ${err}`)
    // This error code indicates that the chain has not been added to MetaMask.
  }
}

connect();

}

window.addEventListener('DOMContentLoaded', initialize);
