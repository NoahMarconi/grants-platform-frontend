import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TransactionHistoryComponent } from './transaction-history.component';
import { HeaderModule } from '../header/header.module';

const routes: Routes = [
  {
    path: '',
    component: TransactionHistoryComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionHistoryComponent]
})
export class TransactionHistoryModule { }
