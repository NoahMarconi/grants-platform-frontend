import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TrendingGrantsComponent } from './trending-grants.component';
import { MenuPopoverComponent } from '../menu-popover/menu-popover.component';
import { MenuPopoverModule } from '../menu-popover/menu-popover.module';
import { HeaderModule } from '../header/header.module';


const routes: Routes = [
  {
    path: '',
    component: TrendingGrantsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    MenuPopoverModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [MenuPopoverComponent],
  declarations: [TrendingGrantsComponent]
})
export class TrendingGrantsModule {}
