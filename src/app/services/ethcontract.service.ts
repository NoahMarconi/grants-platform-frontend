import { Injectable } from '@angular/core';
import { ethersConfig } from '../../environments/environment';
import * as Web3 from 'web3';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddressZero, Zero } from "ethers/constants";
import { async } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { AppSettings } from '../config/app.config';
import { resolve } from 'url';

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
    user: any;

    private acctInfoSubject = new Subject<AcctInfo>();
    acctInfo = this.acctInfoSubject.asObservable();

    constructor(
        private toastr: ToastrService,
        private utils: UtilsService
    ) {
        if (typeof window.web3 !== 'undefined') {
            this.web3Provider = window.web3.currentProvider;
        } else {
            this.toastr.warning('Please use a dapp browser like mist or MetaMask plugin for chrome');
            // alert('Please use a dapp browser like mist or MetaMask plugin for chrome');
            // this.web3Provider = new Web3.providers.HttpProvider(ethersConfig.rpcURL);
        }

        window.web3 = new Web3(this.web3Provider);

        window.ethereum.on('accountsChanged', (accounts) => {
            // this.getAccountInfo();
        })

        this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));

        // this.isManager();
        // this.canFund();
        // this.remainingAllocation();
        // this.approvePayout();
        // this.fund();
        // this.cancelGrant();

        // this.contract = window.web3.eth.contract(tokenAbi.abi).at("0x0b4fac15981fa6208d8991924af83b6dbf2d0e99");
        // this.contract = window.web3.eth.contract(tokenAbi.abi, ethersConfig.contractAddress);
        // console.log("contract", this.contract)

        // let temp = new ethers.providers.Web3Provider(this.web3Provider);
        // let signer = temp.getSigner(0);
        // let contract = new ethers.Contract("0x0b4fac15981fa6208d8991924af83b6dbf2d0e99", tokenAbi.abi, signer);

    }

    getAccountInfo(account) {
        return new Promise((resolve) => {

            window.web3.eth.getBalance(account, (err, balance) => {
                if (err === null) {
                    resolve({
                        account: account,
                        balance: (window.web3.fromWei(balance, "ether")).toNumber()
                    });
                } else {
                    resolve({
                        account: 'error',
                        balance: 0
                    });
                }
            });

            // window.web3.eth.getCoinbase((err, account) => {
            //     // console.log("account", account);
            //     this.account = account;
            //     if (err === null) {
            //         window.web3.eth.getBalance(account, (err, balance) => {
            //             if (err === null) {
            //                 this.acctInfoSubject.next({
            //                     account: account,
            //                     balance: (window.web3.fromWei(balance, "ether")).toNumber()
            //                 });
            //                 resolve();
            //             } else {
            //                 this.acctInfoSubject.next({
            //                     account: 'error',
            //                     balance: 0
            //                 })
            //                 resolve();
            //             }
            //         });
            //     }
            //     resolve();
            // });

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

    async deployContract(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // let data = {
                //     grantees: ['0x6D48912C6c768e0CAd669b0154DD85F156284A21'],
                //     amounts: [10000],
                //     manager: "0x14791697260E4c9A71f18484C9f997B308e59325",
                //     targetFunding: 10000,
                //     fundingExpiration: "1587114701",
                //     contractExpiration: "1589706701"
                // }
                // let provider = new ethers.providers.InfuraProvider(ethersConfig.networks, '56a56ec009b34e31b6aeb4eb817f0772');

                let currency = AddressZero;
                if (data.currency == "wei") {
                    currency = AddressZero;
                }

                let provider = ethers.getDefaultProvider(ethersConfig.networks);

                let wallet = new ethers.Wallet(ethersConfig.privateKey, provider);
                console.log("wallet", wallet);
                let factory = new ethers.ContractFactory(tokenAbi.abi, tokenAbi.bytecode, wallet);

                let contract = await factory.deploy(data.grantees, data.amounts, data.manager, currency, data.targetFunding, data.fundingExpiration, data.contractExpiration, { gasLimit: ethersConfig.gasLimit });
                console.log("contract.address", contract.address);
                console.log("hash", contract.deployTransaction.hash);

                let deployed_contract = await contract.deployed();
                console.log("deployed_contract", deployed_contract);

                resolve(deployed_contract);
            } catch (e) {
                reject({
                    address: ''
                });
            }
        })
    }

    checkAvailableBalance(contractAddress) {
        return new Promise(async (resolve) => {
            try {
                let provider = ethers.getDefaultProvider(ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);

                let balance = await contract.availableBalance()
                // console.log("balance", balance.toNumber());
                resolve(balance.toNumber());
            } catch (e) {
                resolve(e);
            }
        })
    }

    async isManager() {
        let contractAddress = "0x8899FF97eD1c6EF6416b12E0025E8c8EEF43aFCc"
        let user = "0x14791697260E4c9A71f18484C9f997B308e59325"

        let provider = ethers.getDefaultProvider(ethersConfig.networks);
        let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
        let isManager = await contract.isManager(user);
        console.log("isManager", isManager);
    }

    canFund(contractAddress) {
        return new Promise(async (resolve) => {
            try {
                let provider = ethers.getDefaultProvider(ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let canFund = await contract.canFund();
                console.log("canFund", canFund);
                resolve(canFund);
            } catch (e) {
                resolve(false);
            }
        })
    }

    fund(contractAddress, amount, userPrivateKey) {
        return new Promise(async (resolve, reject) => {
            try {
                this.utils.startLoader();

                let provider = ethers.getDefaultProvider(ethersConfig.networks);
                let myWallet = new ethers.Wallet(userPrivateKey, provider);
                let valuetkn = new ethers.utils.BigNumber(amount);
                let fund = await myWallet.sendTransaction({
                    to: contractAddress,
                    value: valuetkn,
                    gasLimit: ethersConfig.gasLimit
                });
                console.log("fund", fund)
                let funding = await fund.wait();
                // console.log("funding", funding);
                this.utils.stopLoader();
                resolve({
                    amount: amount,
                    status: "Success"
                });
            } catch (e) {
                this.utils.stopLoader();
                reject({
                    amount: amount,
                    status: "Failed"
                });
            }
        })
    }

    remainingAllocation(contractAddress, userPublicKey) {
        return new Promise(async (resolve, reject) => {
            try {
                let provider = ethers.getDefaultProvider(ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let remainingAllocation = await contract.remainingAllocation(userPublicKey);
                resolve(remainingAllocation.toNumber());
            } catch (e) {
                reject();
            }
        });
    }

    approvePayout(contractAddress, managerPrivateKey, granteePublicKey, amount) {
        return new Promise(async (resolve, reject) => {
            this.utils.startLoader();

            let provider = ethers.getDefaultProvider(ethersConfig.networks);
            let managerWallet = new ethers.Wallet(managerPrivateKey, provider);
            let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
            let contractWithSigner = contract.connect(managerWallet);
            let valuetkn = new ethers.utils.BigNumber(amount);
            let fund = await contractWithSigner.approvePayout(valuetkn, granteePublicKey, { gasLimit: ethersConfig.gasLimit });
            console.log("fund", fund)
            let funding = await fund.wait();
            // console.log("funding", funding);
            this.utils.stopLoader();
            resolve({
                contract: contractAddress,
                grantee: granteePublicKey,
                amount: amount,
                status: "Success"
            });
        })
    }

    cancelGrant(contractAddress, userPrivateKey) {
        return new Promise(async (resolve, reject) => {
            try {
                let provider = ethers.getDefaultProvider(ethersConfig.networks);
                let wallet = new ethers.Wallet(userPrivateKey, provider);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let contractWithSigner = contract.connect(wallet);
                // console.log("contractWithSigner", contractWithSigner);
                let cancelGrant = await contractWithSigner.cancelGrant({ gasLimit: ethersConfig.gasLimit });
                // console.log("cancelGrant", cancelGrant);

                let tx = await cancelGrant.wait();
                resolve(tx);
            } catch (e) {
                reject();
            }
        })
    }

}
