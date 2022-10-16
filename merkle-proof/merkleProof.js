const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

const leaves = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 
'0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
 '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'].map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256,{sortPairs:true})
const root = tree.getRoot().toString('hex')

console.log(tree.toString())
console.log(root)
const leaf = keccak256('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC')
const proof = tree.getProof(leaf)

for (let i=0;i<proof.length;i++){
    console.log(`${i} element position: ${proof[i].position} data: ${MerkleTree.bufferToHex(proof[i].data)}`)
}

console.log(tree.verify(proof, leaf, root)) // true


