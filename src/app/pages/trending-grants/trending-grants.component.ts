import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';

@Component({
  selector: 'app-trending-grants',
  templateUrl: './trending-grants.component.html',
  styleUrls: ['./trending-grants.component.scss'],
})
export class TrendingGrantsComponent implements OnInit {

  constructor(public popoverCtrl: PopoverController, public modalController: ModalController) { }

  approvedPayments = [
    {
      title: "Untitled Grant",
      link: "https://grantlink.com",
      cost: "1,500",
      milestone: "1",
      apuserimg: "avatar-03",
      apusername: "John Smith"
    }, {
      title: "Untitled Grant",
      link: "https://grantlink.com",
      cost: "1,500",
      milestone: "1",
      apuserimg: "avatar-04",
      apusername: "John Smith"
    }
  ]
  withdrawnPayments = [
    {
      title: "Untitled Grant",
      link: "https://grantlink.com",
      cost: "1,500",
      milestone: "1",
      apuserimg: "avatar-03",
      apusername: "John Smith",
      wptime: "Withdrawn on 02.02.2019"
    }, {
      title: "Untitled Grant",
      link: "https://grantlink.com",
      cost: "1,500",
      milestone: "1",
      apuserimg: "avatar-04",
      apusername: "John Smith",
      wptime: "Withdrawn on 02.02.2019"
    }, {
      title: "Untitled Grant",
      link: "https://grantlink.com",
      cost: "1,500",
      milestone: "1",
      apuserimg: "avatar-04",
      apusername: "John Smith",
      wptime: "Withdrawn on 02.02.2019"
    }
  ]
  ngOnInit() {
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
}
