import rinkeby from './4.json';
import goerli from './5.json';
import mumbai from './80001.json';

export const SupportedChainIds = [4, 5, 80001];

export const getAddressesForChainId = chainId => {
  switch (chainId) {
    case 4:
      return rinkeby;
    case 5:
      return goerli;
    case 80001:
      return mumbai;
    default:
      return null;
  }
};
