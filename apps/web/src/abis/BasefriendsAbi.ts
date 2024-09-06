export default [
  {
    inputs: [{ internalType: 'address', name: 'registry_', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'InvalidNode',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'address', name: 'addr', type: 'address' },
    ],
    name: 'NotAuthroized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'ConnectionsCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { indexed: false, internalType: 'bytes32', name: 'newFollower', type: 'bytes32' },
    ],
    name: 'FollowerAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { indexed: false, internalType: 'bytes32[]', name: 'newFollows', type: 'bytes32[]' },
    ],
    name: 'FollowsAdded',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'bytes32[]', name: 'newFollows', type: 'bytes32[]' },
    ],
    name: 'addFollows',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'clearAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'getFollowNodes',
    outputs: [{ internalType: 'bytes32[]', name: '', type: 'bytes32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'getFollowerNodes',
    outputs: [{ internalType: 'bytes32[]', name: '', type: 'bytes32[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'getFollowers',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'getFollows',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint64', name: 'recordVersions', type: 'uint64' },
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
    ],
    name: 'graph',
    outputs: [
      {
        components: [{ internalType: 'uint256', name: '_spacer', type: 'uint256' }],
        internalType: 'struct EnumerableSetLib.Bytes32Set',
        name: 'follows',
        type: 'tuple',
      },
      {
        components: [{ internalType: 'uint256', name: '_spacer', type: 'uint256' }],
        internalType: 'struct EnumerableSetLib.Bytes32Set',
        name: 'followers',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'bytes32[]', name: 'newFollows', type: 'bytes32[]' },
    ],
    name: 'removeFollows',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'versions',
    outputs: [{ internalType: 'uint64', name: 'version', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
