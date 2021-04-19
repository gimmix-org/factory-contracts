import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-typechain';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-etherscan';

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.3',
        settings: {
          optimizer: {
            enabled: true
          }
        }
      }
    ]
  },
  etherscan: {
    apiKey: require('dotenv').config({ path: '.env.4' }).parsed.ETHERSCAN_KEY
  },
  networks: {
    rinkeby: {
      chainId: 4,
      url: require('dotenv').config({ path: '.env.4' }).parsed.RPC_ENDPOINT
    },
    goerli: {
      chainId: 5,
      url: require('dotenv').config({ path: '.env.5' }).parsed.RPC_ENDPOINT
    },
    mumbai: {
      chainId: 80001,
      url: require('dotenv').config({ path: '.env.80001' }).parsed.RPC_ENDPOINT
    }
  }
};

export default config;
