import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ENVIRONMENT } from 'src/environments/environment';
import { GrantFundService } from 'src/app/services/grantFund.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/config/app.config';

@Component({
  selector: 'app-view-grunt',
  templateUrl: './view-grunt.component.html',
  styleUrls: ['./view-grunt.component.scss'],
})
export class ViewGruntComponent implements OnInit {

  SERVER_URL = ENVIRONMENT.TEMP_URL;

  @Input() grantData: any;
  toastTitle = "Grant Funding"
  processing = false;
  submitted = false;
  user: any;

  grantFund = {
    _id: '',
    grant: '',
    donor: '',
    fundingAmount: null
  }

  constructor(public modalCtrl: ModalController,
    private toastr: ToastrService,
    private navParams: NavParams,
    private grantFundService: GrantFundService) {

    this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
    this.grantData = navParams.get('grantData');
    console.log("grantData", this.grantData)
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

    if (!this.grantFund.fundingAmount) {
      return
    }

    this.grantFund.donor = this.user._id;
    this.grantFund.grant = this.grantData._id;
    delete this.grantFund._id
    // console.log("grant", this.grantFund);
    this.grantFundService.createGrantFund(this.grantFund).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.toastr.success(res.message, this.toastTitle);
        this.modalCtrl.dismiss();
      }
    }, (err) => {
      this.processing = true;
      this.toastr.error('Error. Please try after sometime', this.toastTitle);
    });
  }

}
