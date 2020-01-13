import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { AppSettings } from 'src/app/config/app.config';
import { UserService } from 'src/app/services/user.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any;
  toastTitle = "User";
  profile: File;

  constructor(
    private userManagementService: UserManagementService,
    public popoverCtrl: PopoverController,
    private userService: UserService,
    public modalController: ModalController,
    private toastr: ToastrService
  ) {
    this.userData = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
  }

  ngOnInit() { }

  async userMenuPopover($event) {
    const popover = await this.popoverCtrl.create({
      component: MenuPopoverComponent,
      event: event,
      translucent: true,
      cssClass: 'poopover-user-option'
    })

    return await popover.present();
  }

  async resetPassword(data: any) {
    const modal = await this.modalController.create({
      component: ResetPasswordComponent,
      cssClass: 'custom-modal-style',
      mode: "ios",
    });
    return await modal.present();
  }

  profileUpload(evt) {
    const file = evt.target.files[0];
    if (file && file != undefined) {
      this.userService.uploadProfile(file).subscribe((res: HTTPRESPONSE) => {
        if (res.message) {
          this.userData = res.data;
          this.userManagementService.setUserData(res.data);
          // window.location.reload();
          this.toastr.success(res.message, this.toastTitle);
        }
      }, (err) => {
        this.toastr.error('Error Uploading. Please try after sometime', this.toastTitle);
      });
    }
  }
}
