import { Injectable } from '@angular/core';
import { ethersConfig } from '../../environments/environment';
import * as Web3 from 'web3';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddressZero } from "ethers/constants";

declare let require: any;
declare let window: any;

let tokenAbi = require('../../../abi.json');

export interface AcctInfo {
    account: String,
    balance: number
};

@Injectable({
    providedIn: 'root'
})

export class EthcontractService {
    private web3Provider: null;
    account: any;
    private contract: any;


    private acctInfoSubject = new Subject<AcctInfo>();
    acctInfo = this.acctInfoSubject.asObservable();

    constructor(
        private toastr: ToastrService
    ) {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
        } else {
            this.toastr.warning('Please use a dapp browser like mist or MetaMask plugin for chrome');
            // alert('Please use a dapp browser like mist or MetaMask plugin for chrome');
            // this.web3Provider = new Web3.providers.HttpProvider(ethersConfig.rpcURL);
        }

        window.web3 = new Web3(this.web3Provider);

        // console.log("Date", new Date(2020,11,17))

        window.ethereum.on('accountsChanged', (accounts) => {
            this.getAccountInfo();
        })

        this.deployContract();

        // this.contract = window.web3.eth.contract(tokenAbi.abi).at(ethersConfig.contractAddress);
        // this.contract = window.web3.eth.contract(tokenAbi.abi, ethersConfig.contractAddress);
        // console.log("contract", this.contract)

        // let temp = new ethers.providers.Web3Provider(this.web3Provider);
        // let signer = temp.getSigner(0);
        // let contract = new ethers.Contract(ethersConfig.contractAddress, tokenAbi.abi, signer);

    }

    getAccountInfo() {
        return new Promise((resolve) => {
            window.web3.eth.getCoinbase((err, account) => {
                // console.log("account", account);
                this.account = account;
                if (err === null) {
                    window.web3.eth.getBalance(account, (err, balance) => {
                        if (err === null) {
                            this.acctInfoSubject.next({
                                account: account,
                                balance: (window.web3.fromWei(balance, "ether")).toNumber()
                            });
                            resolve();
                        } else {
                            this.acctInfoSubject.next({
                                account: 'error',
                                balance: 0
                            })
                            resolve();
                        }
                    });
                }
                resolve();
            });

            // window.web3.listAccounts().then(account => {
            //     // console.log("account", account)
            //     if (account.length) {
            //         window.web3.getBalance(account[0]).then((balance) => {
            //             this.acctInfoSubject.next({
            //                 account: account,
            //                 balance: (window.web3.fromWei(balance, "ether")).toNumber()
            //             });
            //         });
            //     } else {
            //         this.acctInfoSubject.next({
            //             account: 'error',
            //             balance: 0
            //         })
            //     }
            // }).catch(err => {
            //     this.acctInfoSubject.next({
            //         account: 'error',
            //         balance: 0
            //     })
            // });
        })
    }

    async deployContract() {
        let grantees = ['0x6D48912C6c768e0CAd669b0154DD85F156284A21']
        let manager = "0x14791697260E4c9A71f18484C9f997B308e59325"
        let amounts = [10];
        let targetFunding = 100;

        var CurrentDate = new Date();

        let fundingExpiration = CurrentDate.setMonth(CurrentDate.getMonth() + 5);
        let contractExpiration = CurrentDate.setMonth(CurrentDate.getMonth() + 6);

        // console.log("fundingExpiration", fundingExpiration)
        // let provider = new ethers.providers.InfuraProvider('ropsten', '56a56ec009b34e31b6aeb4eb817f0772');

        let provider = ethers.getDefaultProvider('ropsten');

        const currentTime = (await provider.getBlock(await provider.getBlockNumber())).timestamp;
        console.log("currentTime", currentTime);

        let wallet = new ethers.Wallet(ethersConfig.privateKey, provider);
        console.log("wallet", wallet);
        let factory = new ethers.ContractFactory(tokenAbi.abi, tokenAbi.bytecode, wallet);
        console.log("factory", factory);

        let contract = await factory.deploy(grantees, amounts, manager, AddressZero, targetFunding, currentTime + 86400, currentTime + (86400 * 2), { gasLimit: 6e6 });
        console.log("contract", contract)

        await contract.deployed();

        console.log("deployed");
    }
}
