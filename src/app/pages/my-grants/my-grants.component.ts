import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

import { PopoverController, ModalController } from '@ionic/angular';

import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { ViewGruntComponent } from '../view-grunt/view-grunt.component';
import { ViewGruntRequestRefundComponent } from '../view-grunt-request-refund/view-grunt-request-refund.component';
import { ViewGruntUnmarkAsCompleteComponent } from '../view-grunt-unmark-as-complete/view-grunt-unmark-as-complete.component';
import { ViewGruntNotificationsComponent } from '../view-grunt-notifications/view-grunt-notifications.component';
import { AmountsReceiveComponent } from '../amounts-receive/amounts-receive.component';
import { GrantService, IGrant } from 'src/app/services/grant.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ENVIRONMENT } from 'src/environments/environment';
import { GrantFundService } from 'src/app/services/grantFund.service';

@Component({
  selector: 'app-my-grants',
  templateUrl: './my-grants.component.html',
  styleUrls: ['./my-grants.component.scss'],
})
export class MyGrantsComponent implements OnInit {

  createdByMeGrant: any;
  fundedByMeGrant: any;
  mangedByMeGrant: any;

  searchCreatedBy: any;
  searchFundedBy: any;
  searchManagedBy: any;

  constructor(public popoverCtrl: PopoverController,
    public modalController: ModalController,
    private grantService: GrantService,
    private grantFundService: GrantFundService,
    public events: Events
  ) {

    this.getAllGrants();
    this.events.subscribe('my-grants', (data) => {
      console.log(data);
      if (data) {
        this.getAllGrants();
      }
    });
  }

  async userMenuPopover($event) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopoverComponent,
      event: event,
      translucent: true,
      cssClass: 'poopover-user-option'
    })

    return await popover.present();
  }

  async viewGrunt(data: any) {
    const modal = await this.modalController.create({
      component: ViewGruntComponent,
      cssClass: 'custom-modal-style',
      mode: "ios",
      componentProps: {
        grantData: data
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        const reload = data['data'];
        // console.log("reload", reload);
        if (reload && reload.hasOwnProperty('reload') && reload.reload) {
          this.getAllGrants();
        }
      });

    return await modal.present();
  }

  async viewGruntRequestRefund() {
    const modal = await this.modalController.create({
      component: ViewGruntRequestRefundComponent,
      cssClass: 'custom-modal-style',
      mode: "ios"
    })
    return await modal.present();
  }

  async viewGruntUnmarkAsComplete() {
    const modal = await this.modalController.create({
      component: ViewGruntUnmarkAsCompleteComponent,
      cssClass: 'custom-modal-style',
      mode: "ios"
    })
    return await modal.present();
  }
  async viewGruntNotifications() {
    const modal = await this.modalController.create({
      component: ViewGruntNotificationsComponent,
      cssClass: 'custom-modal-style notification',
      mode: "ios"
    })
    return await modal.present();
  }
  async amountsReceive() {
    const modal = await this.modalController.create({
      component: AmountsReceiveComponent,
      cssClass: 'custom-modal-style',
      mode: "ios"
    })
    return await modal.present();
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  getAllGrants() {
    this.grantService.getGrantCreatedByMe().subscribe((res: HTTPRESPONSE) => {
      this.createdByMeGrant = res.data;
      this.searchCreatedBy = this.createdByMeGrant;
      // console.log("createdByMeGrant",this.createdByMeGrant)
    });

    this.grantService.getGrantFundedByMe().subscribe((res: HTTPRESPONSE) => {
      this.fundedByMeGrant = res.data
      this.searchFundedBy = this.fundedByMeGrant;
      console.log("fundedByMeGrant", this.fundedByMeGrant);
    });

    this.grantService.getGrantManagedByMe().subscribe((res: HTTPRESPONSE) => {
      this.mangedByMeGrant = res.data;
      this.searchManagedBy = this.mangedByMeGrant;
    });
  }

  handleChange(e) {
    console.log("e", e);
    if (e == '') {
      this.searchCreatedBy = this.createdByMeGrant;
      this.searchFundedBy = this.fundedByMeGrant;
      this.searchManagedBy = this.mangedByMeGrant;
    } else {
      this.searchCreatedBy = this.createdByMeGrant.filter((data) => {
        return data.grantName.toLowerCase().includes(e.toLowerCase())
      });

      this.searchFundedBy = this.fundedByMeGrant.filter((data) => {
        return data.grantName.toLowerCase().includes(e.toLowerCase())
      });

      this.searchManagedBy = this.mangedByMeGrant.filter((data) => {
        return data.grantName.toLowerCase().includes(e.toLowerCase())
      });
    }
  }
}
