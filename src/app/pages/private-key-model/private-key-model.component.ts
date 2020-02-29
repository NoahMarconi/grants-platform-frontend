import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-key-model',
  templateUrl: './private-key-model.component.html',
  styleUrls: ['./private-key-model.component.scss'],
})
export class PrivateKeyModelComponent implements OnInit {
  @Input() public modal;
  processing = false;
  privateKey = '';
  toastTitle = "Private key"

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.processing = true;
    // console.log("this",this.privateKey);
    this.userService.updateUser({ privateKey: this.privateKey }).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.processing = false;
        this.modal.dismiss();
        this.toastr.success("Private key added successfully", this.toastTitle);
        this.router.navigate(['pages']);
      }
    }, (err) => {
      this.processing = false;
      this.toastr.error('Error Login. Please try after sometime', this.toastTitle);
    });
  }

  signOut() {
    this.authService.logout();
    this.toastr.success("Sign out successfully", this.toastTitle);
    this.router.navigate(['auth']);
    this.modal.dismiss();
  }

}
