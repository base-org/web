/* We expect this utility to generate console output during build-time */
const { providers } = require('ethers');
const { getAvatarUri } = require('./getAvatarUri');

async function resolveEnsAvatars(addresses) {
  const alchemyProvider = new providers.AlchemyProvider(
    providers.getNetwork(1),
    process.env.ALCHEMY_API_KEY,
  );

  const results = [];

  // attempt to reverse lookup all DNS entries
  // and then resolve ENS avatars for each one
  console.log('\n\nPre-fetching ENS reverse lookup for core contributors');
  await Promise.all(
    addresses.map(async (address) => {
      const entry = { address };

      const ensName = await alchemyProvider.lookupAddress(address);
      console.log(address, ensName ?? '--');
      if (ensName) {
        entry.ensName = ensName;
      }

      results.push(entry);
    }),
  );

  // then update all records that have a valid ENS name
  // we do this in two batches to prevent being rate-limited
  console.log('\n\nGetting ENS avatars');
  await Promise.all(
    results
      .filter((r) => !!r.ensName)
      .map(async (entry) => {
        const resolver = await alchemyProvider.getResolver(entry.ensName);
        if (resolver) {
          const avatar = await resolver.getText('avatar');
          if (avatar && avatar.length > 0) {
            console.log(entry.ensName, avatar);
            // eslint-disable-next-line no-param-reassign
            entry.avatarUri =
              (await getAvatarUri(entry.address, avatar.toLowerCase(), alchemyProvider)) ?? '';
          }
        }
      }),
  );

  return results;
}

async function getBaseCoreContributors() {
  const baseNftContractAddress = '0xd1633593373974e94b2dd7ebd3c6452328ffe079';
  const url = `${process.env.ALCHEMY_HTTPS}/getOwnersForCollection/?contractAddress=${baseNftContractAddress}`;

  const response = await fetch(url, {
    method: 'get',
    redirect: 'follow',
    headers: {
      accept: 'application/json',
    },
  });
  const data = await response.json();
  const ownerAddresses = data.ownerAddresses ?? [];

  return resolveEnsAvatars(ownerAddresses);
}

module.exports = {
  resolveEnsAvatars,
  getBaseCoreContributors,
};
