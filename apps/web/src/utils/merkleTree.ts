import { SimpleMerkleTree } from '@openzeppelin/merkle-tree';
import { utils } from 'ethers';

export function buildTree(addresses: string[]) {
  return SimpleMerkleTree.of(addresses.map(utils.keccak256));
}

export function getMerkleRoot(tree: SimpleMerkleTree) {
  return tree.root;
}

export function getMerkleProof(address: string, tree: SimpleMerkleTree) {
  return tree.getProof(utils.keccak256(address));
}

export function verify(address: string, tree: SimpleMerkleTree) {
  const proof = getMerkleProof(address, tree);
  const verified = tree.verify(utils.keccak256(address), proof);
  return verified ? proof : null;
}
