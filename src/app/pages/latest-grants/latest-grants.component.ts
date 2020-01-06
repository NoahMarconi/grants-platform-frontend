import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { GrantService, IGrant } from 'src/app/services/grant.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ENVIRONMENT } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ViewGruntComponent } from '../view-grunt/view-grunt.component';

@Component({
  selector: 'app-latest-grants',
  templateUrl: './latest-grants.component.html',
  styleUrls: ['./latest-grants.component.scss'],
})
export class LatestGrantsComponent implements OnInit {

  SERVER_URL = ENVIRONMENT.TEMP_URL;
  allGrant: any;
  seachResult: any = [];

  constructor(public popoverCtrl: PopoverController,
    public modalController: ModalController,
    private grantService: GrantService) {

    this.grantService.getAll().subscribe((res: HTTPRESPONSE) => {
      this.allGrant = res.data;
      this.seachResult = this.allGrant;
    });
  }

  ngOnInit() {
  }

  handleChange(e) {
    console.log("e", e);
    if (e == '') {
      this.seachResult = this.allGrant;
    } else {
      this.seachResult = this.allGrant.filter((data) => {
        return data.grantName.toLowerCase().includes(e.toLowerCase())
      });
      // console.log("temp", this.allGrant);
    }
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
    })
    return await modal.present();
  }
}
