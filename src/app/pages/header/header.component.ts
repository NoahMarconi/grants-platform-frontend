import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppSettings } from 'src/app/config/app.config';
import { ENVIRONMENT } from '../../../environments/environment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { GrantService } from 'src/app/services/grant.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: any;
  allgrant: any;

  path: any;
  searchBar: boolean = false;
  myForm: FormGroup;
  // searchBox: FormControl;
  searchSubscription: Subscription;
  searchResult: any = [];

  @Output() onChange = new EventEmitter();

  constructor(
    public popoverCtrl: PopoverController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private grantService: GrantService,
    private fb: FormBuilder
  ) {
    this.path = this.route.snapshot.pathFromRoot[3].url[0].path;
    if (this.path == "my-grants" || this.path == "latest-grants" || this.path == "trending-grants") {
      this.searchBar = true;
    }

    this.myForm = this.fb.group({
      searchBox: new FormControl()
    });

    this.userData = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));

    this.grantService.getAll().subscribe((res: HTTPRESPONSE) => {
      this.allgrant = res.data;
    })
  }

  ngOnInit() {
    this.searchSubscription = this.myForm.controls.searchBox.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((val: string) => {
        // console.log("val", val)
        if (val == '') {
          this.searchResult = [];
        } else {
          this.searchResult = []
          this.searchResult = this.allgrant.filter((data) => {
            // console.log("data.name.toLowerCase()", data.name.toLowerCase());
            return data.grantName.toLowerCase().includes(val.toLowerCase())
          });
          console.log("temp", this.searchResult);
        }
      })
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

  onSearch() {
    this.onChange.emit(this.myForm.controls.searchBox.value);
  }

  selectGrant(value: any) {
    this.myForm.controls.searchBox.setValue(value.grantName);
    this.onSearch();
  }

}
