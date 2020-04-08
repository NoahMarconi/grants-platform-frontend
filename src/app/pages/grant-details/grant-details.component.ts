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
  payoutRequests = [];
  pendingRequest = [];
  approveRequest = [];
  rejectRequest = []
  grantFundTasks = [];
  totalFundByMe = 0;
  totalPending = 0;
  totalApproved = 0;
  totalReject = 0;
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
          this.getManagerData();
        }

        if (this.userType == this.userEnum.GRANTEE) {
          this.getGranteeData();
        }

        if (this.userType == this.userEnum.DONOR) {
          this.getDonorData();
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

  getManagerData() {
    this.payoutService.getByGrant(this.grantId).subscribe((res: HTTPRESPONSE) => {
      this.payoutRequests = res.data;
      this.pendingRequest = [];
      this.approveRequest = [];
      this.rejectRequest = [];
      this.totalPending = 0;
      this.totalApproved = 0;
      this.totalReject = 0;
      this.payoutRequests.map((data) => {
        if (data.status == "pending") {
          this.pendingRequest.push(data);
          this.totalPending += data.requestAmount;
        }
        if (data.status == "approved") {
          this.approveRequest.push(data);
          this.totalApproved += data.requestAmount;
        }
        if (data.status == "rejected") {
          this.rejectRequest.push(data);
          this.totalReject += data.requestAmount;
        }
      });
    })
  }

  getGranteeData() {
    this.payoutService.getByUserAndGrant(this.grantId).subscribe((res: HTTPRESPONSE) => {
      this.payoutRequests = res.data;
      this.totalPending = 0;
      this.totalApproved = 0;
      this.totalReject = 0;
      this.pendingRequest = [];
      this.approveRequest = [];
      this.rejectRequest = [];
      this.payoutRequests.map((data) => {
        if (data.status == "pending") {
          this.pendingRequest.push(data);
          this.totalPending += data.requestAmount;
        }
        if (data.status == "approved") {
          this.approveRequest.push(data);
          this.totalApproved += data.requestAmount;
        }
        if (data.status == "rejected") {
          this.rejectRequest.push(data);
          this.totalReject += data.requestAmount;
        }
      });
      console.log()
    })
  }

  getDonorData() {
    this.grantFundService.getGrantFundTask().subscribe((res: HTTPRESPONSE) => {
      this.grantFundTasks = res.data;
      this.totalFundByMe = 0;
      this.grantFundTasks.map((task) => {
        this.totalFundByMe += task.amount;
      });
    })
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
      let funding: any = await this.ethcontractService.fund(this.grant.contractId, this.grantFund.amount, this.privateKey);
      // console.log("funding", funding);
      if (funding.status == "Success") {
        this.grantFundService.addGrantFund(this.grantFund).subscribe((res: HTTPRESPONSE) => {
          this.processing = false;
          this.submitted = false;
          this.toastr.success('Successfully sent fund');
          this.getDonorData();
          this.grantAction();
        });
      } else {
        this.toastr.error('Something went wrong !!', this.toastTitle);
      }
    } catch (e) {
      this.processing = false;
      this.submitted = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }

  ConfirmRequestForPayout() {
    this.submitted = true;

    if (!this.request.requestAmount) {
      return
    }

    if (this.request.requestAmount > this.remainingAlloc) {
      return
    }

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
        this.requestForPayout();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

  requestForPayout() {
    this.payoutService.request(this.request).subscribe((res: HTTPRESPONSE) => {
      this.request.requestAmount = null
      this.submitted = false;
      this.processing = false;
      this.toastr.success(res.message, this.toastTitle);
      this.getGranteeData();
    }, (err) => {
      this.processing = false;
      this.toastr.error(err.error.message, this.toastTitle);
    })
  }

  approvePayoutRequestPopup(request, index) {
    this.submitted = true;

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
        this.confiremApprovePayout(request, index)
      }
      this.submitted = false;
    })
  }

  confiremApprovePayout(request, index) {
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
        this.approvePayoutRequest(request, index);
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async approvePayoutRequest(request, index) {
    try {
      let approvePayout: any = await this.ethcontractService.approvePayout(request.grant.contractId, this.privateKey, request.grantee.publicKey, request.requestAmount);
      if (approvePayout.status == "Success") {
        this.payoutService.approve(request._id).subscribe((res: HTTPRESPONSE) => {
          this.toastr.success(res.message, this.toastTitle);
          this.getManagerData();
          this.grantAction();
        }, (err) => {
          this.processing = false;
          this.toastr.error(err.error.message, this.toastTitle);
        })
      }
    } catch (e) {
      this.processing = false;
      this.submitted = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }

  confiremRejectRequest(request, index) {
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
        this.rejectPayoutRequest(request, index);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

  rejectPayoutRequest(request, index) {
    this.payoutService.rejecte(request._id).subscribe((res: HTTPRESPONSE) => {
      this.toastr.success(res.message, this.toastTitle);
      this.getManagerData();
    }, (err) => {
      this.processing = false;
      this.toastr.error(err.error.message, this.toastTitle);
    })
  }

  approveRefundRequestPopup(request, index) {
    this.submitted = true;

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
        this.confiremApproveRefund(request, index)
      }
      this.submitted = false;
    })
  }

  confiremApproveRefund(request, index) {
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
        this.approveRefundRequest(request, index);
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async approveRefundRequest(request, index) {
    try {
      let approveRefund: any = await this.ethcontractService.approveRefund("0x2401624A0CbcB22e54433F3d0E672607Ee911e85", this.privateKey, "0xb7c1A4eB0f206D38C4Db9798098F5aa6683BCBd8", 20);
      console.log("approveRefund", approveRefund);
      if (approveRefund.status == "Success") {
        console.log("call")
        // this.payoutService.approve(request._id).subscribe((res: HTTPRESPONSE) => {
        //   this.toastr.success(res.message, this.toastTitle);
        //   this.getManagerData();
        //   this.grantAction();
        // }, (err) => {
        //   this.processing = false;
        //   this.toastr.error(err.error.message, this.toastTitle);
        // })
      }
    } catch (e) {
      this.processing = false;
      this.submitted = false;
      this.toastr.error('Something went wrong !!', this.toastTitle);
    }
  }

  withdrawRefundPopup() {
    this.submitted = true;

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
        this.confiremWithdrawRefund()
      }
      this.submitted = false;
    })
  }

  confiremWithdrawRefund() {
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
        this.withdrawRefund();
        // Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async withdrawRefund() {
    let refund: any = await this.ethcontractService.withdrawRefund("0x2401624A0CbcB22e54433F3d0E672607Ee911e85", "0x14791697260E4c9A71f18484C9f997B308e59325", this.privateKey);
    // console.log("refund", refund);
  }

  async signal() {
    let signal: any = await this.ethcontractService.signal("0x9b145f6e929012CbAcbd9b1E9B008E3a151684A0", "0123456789012345678901234567890123456789012345678901234567890123", true, 10);

  }
}