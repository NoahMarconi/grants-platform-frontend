import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ethersConfig } from '../../../environments/environment';
import { ethers } from 'ethers';
import * as Web3 from 'web3';
import { EthcontractService } from 'src/app/services/ethcontract.service';
// let Web3 = require('web3')

declare let global: any;

@Component({
  selector: 'app-amounts-receive',
  templateUrl: './amounts-receive.component.html',
  styleUrls: ['./amounts-receive.component.scss'],
})
export class AmountsReceiveComponent implements OnInit {

  title = 'ethersJs';
  balance: any;
  transactionCount = '';
  blockNumber: any;
  block: any;
  gasPrice: any;
  transaction: any;
  receipt: any;

  provider: any;
  contract: any
  wallet: any;
  privateKey = "3AA47101BEFF0ED6AAFE7B3D7EA45274EB036B7FC578E2424238A7A46A9EBAE3";
  // privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";

  rpcURL = 'https://ropsten.infura.io/v3/56a56ec009b34e31b6aeb4eb817f0772' // Your RPC URL goes here

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {


    // let currentProvider = new Web3.providers.HttpProvider(this.rpcURL);
    // let web3Provider = new ethers.providers.Web3Provider(currentProvider);
    // console.log("web3Provider", web3Provider);

    // web3Provider.getBalance('0x6D48912C6c768e0CAd669b0154DD85F156284A21').then((balance) => {
    //   let etherString = ethers.utils.formatEther(balance);
    //   console.log("Balance: " + etherString);
    // });

    // this.provider = new ethers.providers.InfuraProvider("ropsten", ethersConfig.apiToken);

    // this.contract = new ethers.Contract(ethersConfig.contractAddress, tokenAbi.abi, this.provider);
    // console.log("contract", this.contract);

    // this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    // console.log("wallet", this.wallet);

    // let contractWithSigner = new ethers.Contract(ethersConfig.contractAddress, this.abi, this.wallet);
    // console.log("contractWithSigner", contractWithSigner);

    // this.getValue();

    // (async () => {
    // })();
  }

  
  // dismiss() {
  //   this.modalCtrl.dismiss()
  // }
  // items = [
  //   { img: "avatar-02", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-03", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-04", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-02", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-03", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-04", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-03", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-04", name: "John Smith", amount: "1,500" },
  //   { img: "avatar-02", name: "John Smith", amount: "1,500" },
  // ]
}
