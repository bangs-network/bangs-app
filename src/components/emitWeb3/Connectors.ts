import EmitBox from '@emit-technology/emit-account-node-sdk';
import Web3 from 'web3';

enum ChainType { _, SERO, ETH, TRON, BSC, EMIT }

const emitBox  = new EmitBox({
    name: "TESTDEMO",
    url: "http://localhost:3000",
    category: "web3",
    contractAddress: ""
}, {
    nodeUrl: "https://mainnet.infura.io/v3/faa4639b090f46499f29d894da0551a0",
    chainType: ChainType.ETH,
    chainId: "1"
});

export const ethWeb3 = new Web3(emitBox.provider);