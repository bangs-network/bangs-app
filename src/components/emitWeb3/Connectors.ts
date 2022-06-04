import EmitBox,{INetwork} from '@emit-technology/emit-account-node-sdk';
import {ChainType} from '@emit-technology/emit-types'
import Web3 from 'web3';

const network:INetwork = {nodeUrl: "https://node-account-dev.emit.technology", chainId: "667", chainType: ChainType.EMIT.valueOf()}

const dapp = { name: "Bangs", url: window.location.href, category: "web3", contractAddress: "" }

export const emitBox = new EmitBox(dapp, network);

const ethNetwork:INetwork = {nodeUrl: "https://node-bsc.bangs.network", chainId: "15", chainType: ChainType.ETH.valueOf()}

const ethProvider = emitBox.newProvider({
    dapp: dapp,
    network: ethNetwork,
    version: "1.0"
});

export const ethWeb3 = new Web3(ethProvider);