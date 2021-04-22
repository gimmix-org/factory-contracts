import { Deployer__factory, Shop__factory } from '../typechain';

import { generatedWallets } from '../utils/generatedWallets';
import { JsonRpcProvider } from '@ethersproject/providers';
import { constants } from 'ethers';
import chai, { expect } from 'chai';
import asPromised from 'chai-as-promised';
chai.use(asPromised);

const provider = new JsonRpcProvider();

describe('Deployer', function () {
  const [deployerWallet, userWallet1] = generatedWallets(provider);

  it('Should successfully deploy an ERC721 contract', async function () {
    const Deployer = new Deployer__factory(deployerWallet);
    const deployer = await Deployer.deploy();

    await deployer.deployed();

    const userDeployer = Deployer__factory.connect(
      deployer.address,
      userWallet1
    );

    await userDeployer.createShop('Test Shop', 'TEST');

    const portfolioDeployment = await userDeployer.contracts(
      userWallet1.address,
      0
    );

    expect(portfolioDeployment.contractAddress).not.eq(constants.AddressZero);

    const portfolioInstance = await Shop__factory.connect(
      portfolioDeployment.contractAddress,
      userWallet1
    );

    const adminRole = await portfolioInstance.DEFAULT_ADMIN_ROLE();
    const minterRole = await portfolioInstance.MINTER_ROLE();
    const pauserRole = await portfolioInstance.PAUSER_ROLE();
    expect(await portfolioInstance.hasRole(adminRole, userWallet1.address))
      .true;
    expect(await portfolioInstance.hasRole(minterRole, userWallet1.address))
      .true;
    expect(await portfolioInstance.hasRole(pauserRole, userWallet1.address))
      .true;

    expect(await portfolioInstance.hasRole(adminRole, deployerWallet.address))
      .false;
    expect(await portfolioInstance.hasRole(minterRole, deployerWallet.address))
      .false;
    expect(await portfolioInstance.hasRole(pauserRole, deployerWallet.address))
      .false;

    await portfolioInstance.mint(userWallet1.address, 'https://example.com/1');

    const token = await portfolioInstance.tokenURI(0);
    expect(token).eq('https://example.com/1');
  });
});
