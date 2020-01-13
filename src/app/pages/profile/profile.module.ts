import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuPopoverModule } from '../menu-popover/menu-popover.module';
import { HeaderModule } from '../header/header.module';
import { ViewGruntModule } from '../view-grunt/view-grunt.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { UserService } from 'src/app/services/user.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ResetPasswordModule } from '../reset-password/reset-password.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPopoverModule,
    HeaderModule,
    ResetPasswordModule,
    ViewGruntModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MenuPopoverComponent,ResetPasswordComponent],
  providers: [UserService]
})
export class ProfileModule { }
