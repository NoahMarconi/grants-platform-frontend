import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrantService } from 'src/app/services/grant.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-grant-details',
  templateUrl: './grant-details.component.html',
  styleUrls: ['./grant-details.component.scss'],
})
export class GrantDetailsComponent implements OnInit {
  grantId = '';

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

  grantFund = {
    _id: '',
    grant: '',
    donor: '',
    amount: null
  }

  constructor(
    private route: ActivatedRoute,
    private grantService: GrantService,
    private toastr: ToastrService,
  ) {
    this.grantId = this.route.snapshot.params.id || '';
    console.log("this.grantId", this.grantId);

    (async () => {
      // try {
      let res = await this.grantService.getById(this.grantId).toPromise();
      this.grant = res.data;
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

      console.log("this.grant.grantManager", this.grant.grantManager);
      // this.grant.grantManager.map((data) => {
      //   if (data._id == this.user._id) {
      //     this.allowFunding = false;
      //   }
      // });

      // this.grant.grantees.map((data) => {
      //   if (data._id == this.user._id) {
      //     this.allowFunding = false;
      //   }
      // });

      if (this.grant.status == "cancel") {
        this.allowFunding = false;
      }

      // console.log("this.grant", this.grant);

      // } catch (e) {
      //   this.toastr.error('Error. Please try after sometime', 'Grant');
      // }

    })();
  }

  ngOnInit() { }

}
