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
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { firebaseConfig } from '../../../environments/environment';

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
  minYear: any;
  maxYear: any;

  tinymceInit: any;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  videoExtention = [".3gp", ".mp4", ".webm", ".flv", ".avi", ".HDV", ".mkv"]

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
    private angularFireStorage: AngularFireStorage,
    private toastr: ToastrService,
    public router: Router,
    private fb: FormBuilder) {

    this.bindModel();
    this.minYear = new Date().getFullYear();
    this.maxYear = this.minYear + 100;

    this.user = JSON.parse(localStorage.getItem(AppSettings.localStorage_keys.userData));

    this.userService.getAll().subscribe((res: HTTPRESPONSE) => {
      this.userData = res.data;
      console.log("this.userData", this.userData);
    })
  }

  ngOnInit() {

    this.tinymceInit = {
      selector: 'textarea',
      height: 220,
      menubar: true,
      plugins: [
        'autolink',
        'codesample',
        'link',
        'lists',
        'media',
        'powerpaste',
        'table',
        'image',
        'quickbars',
        'codesample',
        'help',
      ],
      toolbar: false,
      quickbars_insert_toolbar: 'quicktable image media codesample',
      quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
      contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean',
      image_advtab: true,

      file_picker_callback: (cb, value, meta) => {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '*/*');

        input.onchange = () => {
          var file = input.files[0];

          // if (file && file.size > 10000000) {
          //   this.toastr.error("media size !!");
          // }

          const folder = "grant-content";
          const fileName = `${new Date().getTime()}_${file.name}`;
          const path = folder + '/' + fileName;
          let downloadURL;
          this.angularFireStorage.upload(path, file)
            .then((snapshot) => {
              if (snapshot.state = "success") {
                downloadURL = 'https://firebasestorage.googleapis.com/v0/b/' + firebaseConfig.storageBucket + '/o/' + folder + '%2F' + fileName + '?alt=media';

                console.log("downloadURL", downloadURL);
                cb(downloadURL, { title: file.name });
              }
            }, (error) => {
              this.toastr.error("Some thing went wrong !!");
            });
        };
        input.click();
      },

      images_upload_handler: (blobInfo, success, failure) => {
        var file = blobInfo.blob();
        const folder = "grant-content";
        const fileName = `${new Date().getTime()}_${blobInfo.filename()}`;
        const path = folder + '/' + fileName;
        let downloadURL;
        this.angularFireStorage.upload(path, file)
          .then((snapshot) => {
            if (snapshot.state = "success") {
              downloadURL = 'https://firebasestorage.googleapis.com/v0/b/' + firebaseConfig.storageBucket + '/o/' + folder + '%2F' + fileName + '?alt=media';

              console.log("downloadURL", downloadURL);
              success(downloadURL);
            }
          }, (error) => {
            this.toastr.error("Some thing went wrong !!");
            failure();
          });
      },

      media_url_resolver: (data, resolve/*, reject*/) => {
        var embedHtml;
        this.videoExtention.map((extention) => {
          if (data.url.indexOf(extention) !== -1) {

            embedHtml = '<iframe src="' + data.url +
              '" width="400" height="400" ></iframe>';
          }
        });

        if (embedHtml) {
          resolve({ html: embedHtml });
        } else {
          resolve({ html: '' });
        }
      }
    };
  }

  bindModel() {
    this.myForm = this.fb.group({
      grantName: ['', Validators.required],
      grantLink: ['', Validators.required],
      grantManager: [[], Validators.required],
      type: ['singleDeliveryDate', Validators.required],
      grantAmount: [null, Validators.required],
      currency: ['currency', Validators.required],
      content: [''],
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
    // name = name.toLocaleLowerCase();
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
    // console.log("content", this.myForm.controls.content.value)

    // console.log("this.myForm.controls", this.myForm.controls);
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
      }
    })

    // console.log("this.myForm.value", this.myForm.value);

    this.processing = true;
    this.grantService.createGrant(this.myForm.value).subscribe((res: HTTPRESPONSE) => {
      if (res.message) {
        this.processing = false;
        this.toastr.success(res.message, this.toastTitle);
        let data = { reload: true }
        this.modalCtrl.dismiss(data);
        this.router.navigate(['pages/my-grants']);
      }
    }, (err) => {
      this.processing = false;
      this.toastr.error('Error. Please try after sometime', this.toastTitle);
    });
  }

  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  fileUpload(base64: any) {
    var file = this.dataURLtoFile(base64, 'content.jpeg');
    // console.log("file", base64);
    if (file) {
      const folder = "grant-content";
      const fileName = `${new Date().getTime()}_${file.name}`;
      const path = folder + '/' + fileName;

      this.angularFireStorage.upload(path, file).then((snapshot) => {
        if (snapshot.state = "success") {
          let downloadURL = 'https://firebasestorage.googleapis.com/v0/b/' + firebaseConfig.storageBucket + '/o/' + folder + '%2F' + fileName + '?alt=media';

          console.log("downloadURL", downloadURL);

          return downloadURL;
        }
      });
    }
  }
}