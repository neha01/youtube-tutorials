// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/utils/cryptography/MerkleProof.sol";

contract MyToken is ERC721, Ownable {

    bytes32 public root;
    mapping(address => bool) public whitelistClaimed;

    constructor(bytes32 _root) ERC721("MyToken", "MTK") {
        root = _root;
    }

    function safeMint(address to, uint256 tokenId, bytes32[] memory proof) public {
        require(!whitelistClaimed[msg.sender],"Whitelist spot already claimed byt his address");
        require(isValidWhitelistAddress(keccak256(abi.encodePacked(msg.sender)),proof),"Not a valid whitelist address");
        whitelistClaimed[msg.sender] = true;
        _safeMint(to, tokenId);
    }

    function isValidWhitelistAddress(bytes32 leaf, bytes32[] memory proof) public view returns (bool) {
        return MerkleProof.verify(proof,root,leaf);
    }
}