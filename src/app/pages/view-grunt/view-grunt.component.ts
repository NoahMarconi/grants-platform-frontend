import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ENVIRONMENT } from 'src/environments/environment';
import { GrantFundService } from 'src/app/services/grantFund.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/config/app.config';
import { Router } from '@angular/router';
import { GrantService } from 'src/app/services/grant.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-grunt',
  templateUrl: './view-grunt.component.html',
  styleUrls: ['./view-grunt.component.scss'],
})
export class ViewGruntComponent implements OnInit {

  @Input() grantData: any;

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
    public modalCtrl: ModalController,
    private toastr: ToastrService,
    private navParams: NavParams,
    public router: Router,
    private grantFundService: GrantFundService,
    private grantService: GrantService) {

    this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
    this.grantData = navParams.get('grantData');

    (async () => {
      try {
        let res = await this.grantService.getById(this.grantData._id).toPromise();
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

        this.grant.grantManager.map((data) => {
          if (data._id == this.user._id) {
            this.allowFunding = false;
          }
        });

        this.grant.grantees.map((data) => {
          if (data._id == this.user._id) {
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

  dismiss() {
    this.modalCtrl.dismiss()
  }
  items = [
    { status: "completed", title: "Milestone 1", date: "02.02.2019", cost: "1,500", totalcost: "5,000" },
    { status: "completed", title: "Milestone 1", date: "02.02.2019", cost: "1,500", totalcost: "5,000" },
    { status: "tobereceivesd", title: "Milestone 1", date: "02.02.2019", cost: "1,500", totalcost: "5,000" },
    { status: "pending", title: "Milestone 1", date: "02.02.2019", cost: "1,500", totalcost: "5,000" },
    { status: "pending", title: "Milestone 1", date: "02.02.2019", cost: "1,500", totalcost: "5,000" }
  ]

  ngOnInit() {

  }

  creteteGrantFund() {
    this.submitted = true;

    if (!this.grantFund.amount) {
      return
    }

    this.grantFund.donor = this.user._id;
    this.grantFund.grant = this.grantData._id;
    delete this.grantFund._id
    // console.log("grant", this.grantFund);
    this.grantFundService.createGrantFund(this.grantFund).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.toastr.success(res.message, this.toastTitle);
        let data = { reload: true }
        this.modalCtrl.dismiss(data);
      }
    }, (err) => {
      this.processing = true;
      this.toastr.error('Error. Please try after sometime', this.toastTitle);
    });
  }

}
