import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ModalController, NavParams } from '@ionic/angular';
import { AppSettings } from 'src/app/config/app.config';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  processing = false;
  toastTitle = "User";
  userData: any;


  user = {
    _id: "",
    password: "",
    comfirmPassword: ""
  }

  constructor(
    public modalCtrl: ModalController,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuthService,
    public router: Router,
  ) {
    this.userData = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));
    this.user._id = this.userData._id;
  }

  ngOnInit() { }


  dismiss() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss()
    }
  }

  onSubmit() {
    this.processing = true;
    // delete this.user.comfirmPassword;
    this.userService.updateUser(this.user).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.processing = false;
        this.dismiss();
        this.toastr.success("Password reset successfully", this.toastTitle);
        this.authService.logout();
        this.router.navigate(['auth']);
      }
    }, (err) => {
      // this.user["comfirmPassword"] = "";
      this.processing = false;
      this.toastr.error('Error Login. Please try after sometime', this.toastTitle);
    });
  }
}
