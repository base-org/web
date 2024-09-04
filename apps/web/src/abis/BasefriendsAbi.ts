export default [
  {
    type: 'constructor',
    inputs: [{ name: 'registry_', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addFollows',
    inputs: [
      { name: 'node', type: 'bytes32', internalType: 'bytes32' },
      { name: 'newFollows', type: 'bytes32[]', internalType: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'clearAll',
    inputs: [{ name: 'node', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getFollowers',
    inputs: [{ name: 'node', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'string[]', internalType: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFollows',
    inputs: [{ name: 'node', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'string[]', internalType: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'graph',
    inputs: [
      { name: 'recordVersions', type: 'uint64', internalType: 'uint64' },
      { name: 'node', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [
      {
        name: 'follows',
        type: 'tuple',
        internalType: 'struct EnumerableSetLib.Bytes32Set',
        components: [{ name: '_spacer', type: 'uint256', internalType: 'uint256' }],
      },
      {
        name: 'followers',
        type: 'tuple',
        internalType: 'struct EnumerableSetLib.Bytes32Set',
        components: [{ name: '_spacer', type: 'uint256', internalType: 'uint256' }],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeFollows',
    inputs: [
      { name: 'node', type: 'bytes32', internalType: 'bytes32' },
      { name: 'newFollows', type: 'bytes32[]', internalType: 'bytes32[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'versions',
    inputs: [{ name: 'node', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: 'version', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'ConnectionsCleared',
    inputs: [{ name: 'node', type: 'bytes32', indexed: true, internalType: 'bytes32' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FollowerAdded',
    inputs: [
      { name: 'node', type: 'bytes32', indexed: true, internalType: 'bytes32' },
      { name: 'newFollower', type: 'bytes32', indexed: false, internalType: 'bytes32' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'FollowsAdded',
    inputs: [
      { name: 'node', type: 'bytes32', indexed: true, internalType: 'bytes32' },
      { name: 'newFollows', type: 'bytes32[]', indexed: false, internalType: 'bytes32[]' },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'IndexOutOfBounds', inputs: [] },
  {
    type: 'error',
    name: 'NotAuthroized',
    inputs: [
      { name: 'node', type: 'bytes32', internalType: 'bytes32' },
      { name: 'addr', type: 'address', internalType: 'address' },
    ],
  },
] as const;
