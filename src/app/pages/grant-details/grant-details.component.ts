import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrantService } from 'src/app/services/grant.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { EthcontractService } from 'src/app/services/ethcontract.service';
import { AppSettings } from 'src/app/config/app.config';
import { async } from '@angular/core/testing';
import { GrantFundService } from 'src/app/services/grantFund.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { PayoutService } from 'src/app/services/payout.service';

@Component({
  selector: 'app-grant-details',
  templateUrl: './grant-details.component.html',
  styleUrls: ['./grant-details.component.scss'],
})
export class GrantDetailsComponent implements OnInit {
  grantId = '';
  privateKey = ''

  statusEnum = {
    PENDING: "pending",
    COMPLETED: "completed",
    TOBERECEIVED: "tobereceived"
  }

  userEnum = {
    MANAGER: "manager",
    GRANTEE: "grantee",
    DONOR: "donor",
  }

  userType = this.userEnum.DONOR;
  grant: any;
  payoutRequests: any;
  toastTitle = "Grant"
  multipleMilestones = false;
  processing = false;
  submitted = false;
  user: any;
  canFund: any = false;
  canRequestPayout = false;
  balance: any = 0;
  remainingAlloc: any = 0;

  grantFund = {
    grant: '',
    amount: null
  }

  request = {
    grant: '',
    requestAmount: null
  }

  constructor(
    private route: ActivatedRoute,
    private grantService: GrantService,
    private grantFundService: GrantFundService,
    private payoutService: PayoutService,
    private toastr: ToastrService,
    private ethcontractService: EthcontractService,
  ) {
    this.grantId = this.route.snapshot.params.id || '';

    (async () => {
      try {
        this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
        this.grantFund.grant = this.grantId;
        this.request.grant = this.grantId;

        let res = await this.grantService.getById(this.grantId).toPromise();
        this.grant = res.data;
        console.log("this.grant", this.grant);
        this.grant.content = this.htmlDecode(this.grant.content);

        if (this.grant.grantManager._id == this.user._id) {
          this.userType = this.userEnum.MANAGER;
        }

        this.grant.grantees.map((data) => {
          if (data.grantee._id == this.user._id) {
            this.userType = this.userEnum.GRANTEE;
          }
        });

        if (this.userType == this.userEnum.MANAGER) {
          this.payoutService.getByGrant(this.grantId).subscribe((res: HTTPRESPONSE) => {
            this.payoutRequests = res.data;
            console.log("this.payoutRequests", this.payoutRequests);
          })
        }

        if (this.userType == this.userEnum.GRANTEE) {
          this.payoutService.getByUserAndGrant(this.grantId).subscribe((res: HTTPRESPONSE) => {
            this.payoutRequests = res.data;
            console.log("this.payoutRequests", this.payoutRequests);
          })
        }

        this.grantAction();

        if (this.grant.type == "multipleMilestones") {
          this.multipleMilestones = true;

          let tobereceived = true;
          this.grant.multipleMilestones = this.grant.multipleMilestones.map((data: any) => {
            let status: any;
            let now = new Date().toISOString();

            let isAfter = moment(data.completionDate).isAfter(moment(now));
            // let isBefore = moment(data.completionDate).isBefore(moment(now));

            if (isAfter) {
              if (tobereceived) {
                status = this.statusEnum.TOBERECEIVED;
                tobereceived = false;
              } else {
                status = this.statusEnum.PENDING;
              }
            }

            if (!isAfter) {
              status = this.statusEnum.COMPLETED;
            }

            data.completionDate = moment(data.completionDate).format('DD/MM/YYYY');
            data = {
              ...data,
              status: status
            }
            return data;
          });
        } else {
          this.grant.singleDeliveryDate.completionDate = moment(this.grant.singleDeliveryDate.completionDate).format('DD/MM/YYYY');
          this.grant.singleDeliveryDate.fundingExpiryDate = moment(this.grant.singleDeliveryDate.fundingExpiryDate).format('DD/MM/YYYY');

          let now = new Date().toISOString();
          let isAfter = moment(this.grant.singleDeliveryDate.completionDate).isAfter(moment(now));

          if (isAfter) {
            this.grant.singleDeliveryDate["status"] = this.statusEnum.COMPLETED;
          } else {
            this.grant.singleDeliveryDate["status"] = this.statusEnum.TOBERECEIVED;
          }
        }
      } catch (e) {
        this.toastr.error('Error. Please try after sometime', 'Grant');
      }

    })();
  }

  ngOnInit() {
  }

  htmlDecode(input: any) {
    var e = document.createElement("textarea");
    e.innerHTML = input;
    return e.value;
  };

  async grantAction() {
    let promise = [];
    promise.push(
      this.ethcontractService.checkAvailableBalance(this.grant.contractId),
      this.ethcontractService.remainingAllocation(this.grant.contractId, this.user.publicKey),
      this.ethcontractService.canFund(this.grant.contractId)
    );

    let promiseRes = await Promise.all(promise);
    this.balance = promiseRes[0];
    this.remainingAlloc = promiseRes[1];
    this.canFund = promiseRes[2];

    if (this.canFund) {
      if (this.userType == this.userEnum.MANAGER || this.userType == this.userEnum.GRANTEE) {
        this.canFund = false;
      }
    } else {
      if (this.userType == this.userEnum.GRANTEE) {
        this.canRequestPayout = true;
      }
    }

    console.log("canFund", this.canFund);
    console.log("canRequestPayout", this.canRequestPayout);
  }


  cancleGrantPopup() {
    Swal.fire({
      title: 'Please enter your private key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      // showLoaderOnConfirm: true,
      preConfirm: (data) => {
        if (data) {
          return data
        }
        return Swal.showValidationMessage(
          `Private key must be required`
        )
      },
    }).then((result) => {
      console.log("result", result);
      if (result.value) {
        this.privateKey = result.value;
        this.ConfirmCancleGrant();
      }
    })
  }

  ConfirmCancleGrant() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(async (result) => {
      if (result.value) {
        this.cancelGrant();
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async cancelGrant() {
    try {
      if (this.grant.grantManager._id != this.user._id) {
        if (this.grant.type == "multipleMilestones") {
          let date = moment(this.grant.multipleMilestones[this.grant.multipleMilestones.length - 1].completionDate, 'DD/MM/YYYY').toISOString();
          let isAfter = moment(date).isAfter(moment(new Date().toISOString()));
          if (isAfter) {
            this.toastr.error('You can not cancel this grant !!');
            return;
          }
        } else {
          let date = moment(this.grant.singleDeliveryDate.completionDate, 'DD/MM/YYYY').toISOString();
          let isAfter = moment(date).isAfter(moment(new Date().toISOString()));
          if (isAfter) {
            this.toastr.error('You can not cancel this grant !!');
            return;
          }
        }
      }

      let cancelGrant = await this.ethcontractService.cancelGrant(this.grant.contractId, this.privateKey);
      if (cancelGrant) {
        this.grantService.createGrant(this.grantId).subscribe((res: HTTPRESPONSE) => {
          this.toastr.success('Successfully canceled grant');
        });
      }
    } catch (e) {
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }

  fundOnGrantPopup() {
    this.submitted = true;

    if (!this.grantFund.amount) {
      return
    }

    Swal.fire({
      title: 'Please enter your private key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      // showLoaderOnConfirm: true,
      preConfirm: (data) => {
        if (data) {
          return data
        }
        return Swal.showValidationMessage(
          `Private key must be required`
        )
      },
    }).then(async (result) => {
      if (result.value) {
        this.privateKey = result.value;
        this.ConfirmFundGrant()
      }
      this.submitted = false;
    })
  }

  ConfirmFundGrant() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(async (result) => {
      if (result.value) {
        this.fundOnGrant();
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async fundOnGrant() {
    try {
      let funding = await this.ethcontractService.fund(this.grant.contractId, this.grantFund.amount, this.privateKey);
      console.log("funding", funding);
      if (funding) {
        this.grantFundService.addGrantFund(this.grantFund).subscribe((res: HTTPRESPONSE) => {
          this.processing = false;
          this.submitted = false;
          this.toastr.success('Successfully sent fund');
          this.grantAction();
        });
      }
    } catch (e) {
      this.processing = false;
      this.submitted = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }

  requestForPayout() {
    this.payoutService.request(this.request).subscribe((res: HTTPRESPONSE) => {
      this.processing = false;
      this.toastr.success(res.message, this.toastTitle);
      this.grantAction();
    }, (err) => {
      this.processing = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    })
  }

  confiremAcceptPayout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(async (result) => {
      if (result.value) {
        this.approvePayoutRequest();
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async approvePayoutRequest() {
    try {
      // let approvePayout = this.ethcontractService.approvePayout(this.grant.contractId);
      // if (approvePayout) {

      // }
    } catch (e) {
      this.processing = false;
      this.submitted = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }
}