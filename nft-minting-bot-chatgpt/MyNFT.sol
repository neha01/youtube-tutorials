pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() public ERC721("MyNFT", "MNFT") {}

    function mint(uint256 _tokenId) public payable {
        require(msg.value == 1 ether, "Must send 1 ether to mint an NFT");
        _safeMint(msg.sender,_tokenId);
    }
}
