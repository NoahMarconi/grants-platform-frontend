import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AddressZero, Zero } from "ethers/constants";
import { UtilsService } from './utils.service';
import { AppSettings } from '../config/app.config';

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
            // this.web3Provider = new Web3.providers.HttpProvider(AppSettings.ethersConfig.rpcURL);
        }

        window.web3 = new Web3(this.web3Provider);

        window.ethereum.on('accountsChanged', (accounts) => {
            // this.getAccountInfo();
        })

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
                this.utils.startLoader();

                // let data = {
                //     grantees: ['0x6D48912C6c768e0CAd669b0154DD85F156284A21'],
                //     amounts: [10000],
                //     manager: "0x14791697260E4c9A71f18484C9f997B308e59325",
                //     targetFunding: 10000,
                //     fundingExpiration: "1587114701",
                //     contractExpiration: "1589706701"
                // }
                // let provider = new ethers.providers.InfuraProvider(AppSettings.ethersConfig.networks, '56a56ec009b34e31b6aeb4eb817f0772');

                let currency = AddressZero;
                if (data.currency == "wei") {
                    currency = AddressZero;
                }

                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);

                let wallet = new ethers.Wallet(AppSettings.ethersConfig.privateKey, provider);
                console.log("wallet", wallet);
                let factory = new ethers.ContractFactory(tokenAbi.abi, tokenAbi.bytecode, wallet);

                let contract = await factory.deploy(data.grantees, data.amounts, data.manager, currency, data.targetFunding, data.fundingExpiration, data.contractExpiration, { gasLimit: AppSettings.ethersConfig.gasLimit });
                console.log("contract.address", contract.address);
                console.log("hash", contract.deployTransaction.hash);

                let deployed_contract = await contract.deployed();
                console.log("deployed_contract", deployed_contract);

                resolve(deployed_contract);
                this.utils.stopLoader();
            } catch (e) {
                this.utils.stopLoader();
                reject({
                    address: ''
                });
            }
        })
    }

    checkAvailableBalance(contractAddress) {
        return new Promise(async (resolve) => {
            try {
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let balance = await contract.availableBalance();
                resolve(balance.toNumber());
            } catch (e) {
                resolve(0);
            }
        })
    }

    async isManager(contractAddress, publicKey) {
        return new Promise(async (resolve, reject) => {
            try {
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let isManager = await contract.isManager(publicKey);
                resolve(isManager);
            } catch (e) {
                reject(false)
            }
        });
    }

    canFund(contractAddress) {
        return new Promise(async (resolve, reject) => {
            try {
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let canFund = await contract.canFund();
                console.log("canFund", canFund);
                resolve(canFund);
            } catch (e) {
                reject(false);
            }
        })
    }

    fund(contractAddress, amount, userPrivateKey) {
        return new Promise(async (resolve, reject) => {
            try {
                this.utils.startLoader();

                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let Wallet = new ethers.Wallet(userPrivateKey, provider);
                let valuetkn = new ethers.utils.BigNumber(amount);

                let fund = await Wallet.sendTransaction({
                    to: contractAddress,
                    value: valuetkn,
                    gasLimit: AppSettings.ethersConfig.gasLimit
                });

                let funding = await fund.wait();
                console.log("funding", funding);
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
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
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
            try {
                this.utils.startLoader();
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let managerWallet = new ethers.Wallet(managerPrivateKey, provider);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let contractWithSigner = contract.connect(managerWallet);
                let valuetkn = new ethers.utils.BigNumber(amount);
                let approve = await contractWithSigner.approvePayout(valuetkn, granteePublicKey, { gasLimit: AppSettings.ethersConfig.gasLimit });
                console.log("approve", approve)
                let approveing = await approve.wait();
                console.log("approveing", approveing);
                this.utils.stopLoader();
                resolve({
                    contract: contractAddress,
                    grantee: granteePublicKey,
                    amount: amount,
                    status: "Success"
                });
            } catch (e) {
                this.utils.stopLoader();
                reject({
                    contract: contractAddress,
                    grantee: granteePublicKey,
                    amount: amount,
                    status: "Failed"
                });
            }

        })
    }

    approveRefund(contractAddress, managerPrivateKey, userPublicKey, amount) {
        return new Promise(async (resolve, reject) => {
            // try {
            this.utils.startLoader();
            console.log("contractAddress, managerPrivateKey, userPublicKey, amount", contractAddress, managerPrivateKey, userPublicKey, amount)
            let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
            let managerWallet = new ethers.Wallet(managerPrivateKey, provider);
            let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
            let contractWithSigner = contract.connect(managerWallet);
            let valuetkn = new ethers.utils.BigNumber(amount);
            let approve = await contractWithSigner.approveRefund(valuetkn, userPublicKey, { gasLimit: AppSettings.ethersConfig.gasLimit });
            console.log("approve", approve)
            let approveing = await approve.wait();
            this.utils.stopLoader();
            resolve({
                contract: contractAddress,
                grantee: userPublicKey,
                amount: amount,
                status: "Success"
            });
            // } catch (e) {
            //     this.utils.stopLoader();
            //     reject({
            //         contract: contractAddress,
            //         grantee: userPublicKey,
            //         amount: amount,
            //         status: "Failed"
            //     });
            // }

        })
    }

    withdrawRefund(contractAddress, donorAddress, donorPrivateKey) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("contractAddress, donorAddress, donorPrivateKey", contractAddress, donorAddress, donorPrivateKey);
                this.utils.startLoader();
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let Wallet = new ethers.Wallet(donorPrivateKey, provider);
                let contractWithSigner = contract.connect(Wallet);
                let refund = await contractWithSigner.withdrawRefund(donorAddress)
                console.log("refund", refund);
                let refunding = await refund.wait();
                console.log("refunding", refunding);
                this.utils.stopLoader();
                resolve({
                    contract: contractAddress,
                    donor: donorAddress,
                    status: "Success"
                });
            } catch (e) {
                this.utils.stopLoader();
                reject({
                    contract: contractAddress,
                    donor: donorAddress,
                    status: "Failed"
                });
            }
        })
    }

    signal(contractAddress, privateKey, support, amount) {
        return new Promise(async (resolve, reject) => {
            // try {
            console.log("contractAddress, privateKey, support", contractAddress, privateKey, support, amount);
            this.utils.startLoader();
            let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
            let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
            let Wallet = new ethers.Wallet(privateKey, provider);
            let contractWithSigner = contract.connect(Wallet);
            let valuetkn = new ethers.utils.BigNumber(amount);
            let signal = await contractWithSigner.signal(support, { gasLimit: AppSettings.ethersConfig.gasLimit });
            console.log("signal", signal);
            let signaling = await signal.wait();
            console.log("signaling", signaling);
            this.utils.stopLoader();
            resolve();
            // } catch (e) {
            //     this.utils.stopLoader();
            //     reject();
            // }
        })
    }

    cancelGrant(contractAddress, userPrivateKey) {
        return new Promise(async (resolve, reject) => {
            try {
                let provider = ethers.getDefaultProvider(AppSettings.ethersConfig.networks);
                let wallet = new ethers.Wallet(userPrivateKey, provider);
                let contract = new ethers.Contract(contractAddress, tokenAbi.abi, provider);
                let contractWithSigner = contract.connect(wallet);
                // console.log("contractWithSigner", contractWithSigner);
                let cancelGrant = await contractWithSigner.cancelGrant({ gasLimit: AppSettings.ethersConfig.gasLimit });
                // console.log("cancelGrant", cancelGrant);

                let tx = await cancelGrant.wait();
                resolve(tx);
            } catch (e) {
                reject();
            }
        })
    }

}
