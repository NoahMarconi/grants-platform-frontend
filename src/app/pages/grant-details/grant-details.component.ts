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

  grant: any;
  toastTitle = "Grant Funding"
  multipleMilestones = false;
  processing = false;
  submitted = false;
  user: any;
  allowFunding = true;

  balance: any = 0;

  grantFund = {
    _id: '',
    grant: '',
    donor: '',
    amount: null
  }

  constructor(
    private route: ActivatedRoute,
    private grantService: GrantService,
    private grantFundService: GrantFundService,
    private toastr: ToastrService,
    private ethcontractService: EthcontractService,
  ) {
    this.grantId = this.route.snapshot.params.id || '';
    console.log("this.grantId", this.grantId);

    (async () => {
      try {
        this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));

        let res = await this.grantService.getById(this.grantId).toPromise();
        this.grant = res.data;
        this.grant.content = this.htmlDecode(this.grant.content);
        this.grantBalance();
        console.log("this.grant", this.grant)

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
        console.log("this.grant.grantManager", this.user);
        if (this.grant.grantManager._id == this.user._id) {
          this.allowFunding = false;
        }

        this.grant.grantees.map((data) => {
          if (data.grantee._id == this.user._id) {
            this.allowFunding = false;
          }
        });

        if (this.grant.status == "cancel") {
          this.allowFunding = false;
        }

        // console.log("this.grant", this.grant);

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

  async grantBalance() {
    this.balance = await this.ethcontractService.checkAvailableBalance(this.grant.contractId);
  }

  async cancleGrant() {
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
        let cancelGrant = this.ethcontractService.cancelGrant(this.grant.contractId, this.privateKey);
        if (cancelGrant) {
          this.grantService.createGrant(this.grantId).subscribe((data) => { });
        }
        Swal.fire('Deleted!', 'Your request has been sent', 'success');
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled', 'Your request cancelled :)', 'error');
      }
    })
  }

  async fundonGrant() {
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
      console.log("result", result);
      if (result.value) {
        this.privateKey = result.value;
        let funding = await this.ethcontractService.fund(this.grant.contractId, this.grantFund.amount, this.privateKey);
        console.log("funding", funding);
        if (funding) {
          this.grantFundService.createGrantFund(this.grantFund).subscribe((data) => { });
        }
      }
    })

    // try {
    this.submitted = false;
    // } catch(e) {
    this.submitted = false;
    // this.processing = false;
    // this.toastr.error('Something went wrong !!', this.toastTitle);
    // }
  }
}