import rinkeby from './4.json';
import goerli from './5.json';
import mumbai from './80001.json';

const NETWORKS: Record<string, Record<string, string>> = {
  rinkeby,
  goerli,
  mumbai
};

export default NETWORKS;
