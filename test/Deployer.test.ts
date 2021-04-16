import { Deployer__factory, ERC721BasicPortfolio__factory } from '../typechain';

import { generatedWallets } from '../utils/generatedWallets';
import { JsonRpcProvider } from '@ethersproject/providers';
import { constants } from 'ethers';
import chai, { expect } from 'chai';
import asPromised from 'chai-as-promised';
chai.use(asPromised);

const provider = new JsonRpcProvider();

describe('Deployer', function () {
  const [deployerWallet, userWallet1, userWallet2] = generatedWallets(provider);

  it('Should successfully deploy an ERC721 contract', async function () {
    const Deployer = new Deployer__factory(deployerWallet);
    const deployer = await Deployer.deploy();

    await deployer.deployed();

    const userDeployer = Deployer__factory.connect(
      deployer.address,
      userWallet1
    );

    await userDeployer.createERC721('Test ERC721', 'TEST');

    const erc721ContractAddress = await userDeployer.contracts(
      userWallet1.address
    );

    expect(erc721ContractAddress).not.eq(constants.AddressZero);

    const erc721Instance = await ERC721BasicPortfolio__factory.connect(
      erc721ContractAddress,
      userWallet1
    );

    const adminRole = await erc721Instance.DEFAULT_ADMIN_ROLE();
    const minterRole = await erc721Instance.MINTER_ROLE();
    const pauserRole = await erc721Instance.PAUSER_ROLE();
    expect(await erc721Instance.hasRole(adminRole, userWallet1.address)).true;
    expect(await erc721Instance.hasRole(minterRole, userWallet1.address)).true;
    expect(await erc721Instance.hasRole(pauserRole, userWallet1.address)).true;

    expect(await erc721Instance.hasRole(adminRole, deployerWallet.address))
      .false;
    expect(await erc721Instance.hasRole(minterRole, deployerWallet.address))
      .false;
    expect(await erc721Instance.hasRole(pauserRole, deployerWallet.address))
      .false;

    expect(await erc721Instance.hasRole(adminRole, userWallet2.address)).false;
    expect(await erc721Instance.hasRole(minterRole, userWallet2.address)).false;
    expect(await erc721Instance.hasRole(pauserRole, userWallet2.address)).false;

    const user2Deployer = Deployer__factory.connect(
      deployer.address,
      userWallet2
    );

    expect(user2Deployer.createERC721('Test ERC721', 'TEST')).rejected;

    expect(user2Deployer.createERC721('Test ERC721', 'test')).rejected;

    await erc721Instance.mint(userWallet1.address, 'https://example.com/1');

    const token = await erc721Instance.tokenURI(0);
    expect(token).eq('https://example.com/1');
  });
});
