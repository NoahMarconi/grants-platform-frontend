import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IGrant, GrantService } from 'src/app/services/grant.service';
import { HTTPRESPONSE } from 'src/app/common/http-helper/http-helper.class';
import { UserService } from 'src/app/services/user.service';
import { Subscription, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder, Form, FormArray, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AppSettings } from 'src/app/config/app.config';

@Component({
  selector: 'app-create-new-grant',
  templateUrl: './create-new-grant.component.html',
  styleUrls: ['./create-new-grant.component.scss'],
})

export class CreateNewGrantComponent implements OnInit {
  user: any;
  processing = false;
  submitted = false;
  toastTitle = 'Grant';
  userData: any;

  public myForm: FormGroup;
  public tempForm: FormGroup;
  private granteeCount: number = 0;

  searchBox: FormControl;
  searchSubscription: Subscription;
  searchResult: any = [];

  activeGrantee: number;
  activeGranteeControl: any;
  granteesSearchBox: FormControl;
  granteesSubscription: Subscription;
  granteesSearchResult: any = [[]];

  constructor(public modalCtrl: ModalController,
    private grantService: GrantService,
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router,
    private fb: FormBuilder) {

    this.bindModel()
    this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));

    this.userService.getAll().subscribe((res: HTTPRESPONSE) => {
      this.userData = res.data;
      console.log("this.userData", this.userData);
    })
  }

  ngOnInit() {
  }

  bindModel() {
    this.myForm = this.fb.group({
      grantName: ['', Validators.required],
      grantLink: ['', Validators.required],
      grantManager: [[], Validators.required],
      type: ['singleDeliveryDate', Validators.required],
      grantAmount: [null, Validators.required],
      currency: ['currency', Validators.required],
      createdBy: [''],
      singleDeliveryDate: this.fb.group({
        fundingExpiryDate: ['', Validators.required],
        completionDate: ['', Validators.required],
      }),
      multipleMilestones: this.fb.array([
        this.initMilestonesFields()
      ]),
      grantees: [[], Validators.required]
    })

  }

  get form() {
    return this.myForm.controls;
  }

  // singleDelivery
  get singleDelivery() {
    const formGroup = this.myForm.get('singleDeliveryDate') as FormGroup;
    return formGroup.controls
  }

  get singleDeliveryControles() {
    const formGroup = this.myForm.get('singleDeliveryDate') as FormGroup;
    return formGroup
  }

  // multiple Milestone 
  get multipleMilestones(): any {
    const formArray = this.myForm.get('multipleMilestones') as FormArray;
    return formArray.controls;

  }

  get multipleMilestonesControls() {
    const formArray = this.myForm.get('multipleMilestones') as FormArray;
    return formArray;
  }

  initMilestonesFields(): FormGroup {
    return this.fb.group({
      milestoneNumber: new FormControl(null, Validators.required),
      completionDate: new FormControl(null, Validators.required)
    });
  }

  addNewMilestone() {
    const control = <FormArray>this.myForm.controls.multipleMilestones;
    control.push(this.initMilestonesFields());
  }

  removeMilestone(index: number) {
    const control = <FormArray>this.myForm.controls.multipleMilestones;
    control.removeAt(index);
  }

  requestAutocompleteItems = (name: string): Observable<any> => {
    name = name.toLocaleLowerCase();
    return this.userService.searchUser(name)
      .pipe(map(items => items.data.map(item => item.userName)));
  }

  dismiss() {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss()
    }
  }

  setradio(e: string): void {
    this.form.type.setValue(e);
    console.log("this.form.type", this.form.type.value)
  }

  isSelected(name: string): boolean {
    if (!this.form.type.value) {
      return false;
    }
    return (this.form.type.value === name);
  }

  onSubmit() {
    this.submitted = true;

    console.log("this.myForm.controls", this.myForm.controls);
    if (this.myForm.controls.type.value == "singleDeliveryDate") {
      if (this.myForm.controls.grantName.invalid || this.myForm.controls.grantLink.invalid || this.myForm.controls.singleDeliveryDate.invalid
        || this.myForm.controls.grantManager.invalid || this.myForm.controls.grantees.invalid || this.myForm.controls.grantAmount.invalid) {
        return
      }
    } else {
      if (this.myForm.controls.grantName.invalid || this.myForm.controls.grantLink.invalid || this.myForm.controls.multipleMilestones.invalid
        || this.myForm.controls.grantManager.invalid || this.myForm.controls.grantees.invalid || this.myForm.controls.grantAmount.invalid) {
        return
      }
    }

    let grantees = [];
    this.myForm.value.grantees.map((data) => {
      this.userData.find((user) => {
        if (user.userName == data.display) {
          grantees.push(user._id)
        }
      })
    })

    this.myForm.value.grantees = grantees;

    this.userData.find((user) => {
      if (user.userName == this.myForm.value.grantManager[0].display) {
        this.myForm.value.grantManager = [user._id]
        // this.myForm.value["grantManager"] = [user._id]
      }
    })

    this.myForm.value.createdBy = this.user._id;
    console.log("this.myForm.value", this.myForm.value);

    this.processing = true;
    this.grantService.createGrant(this.myForm.value).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.toastr.success(res.message, this.toastTitle);
        this.modalCtrl.dismiss();
        this.router.navigate(['pages/my-grants']);
      }
    }, (err) => {
      this.processing = true;
      this.toastr.error('Error. Please try after sometime', this.toastTitle);
    });
  }
}