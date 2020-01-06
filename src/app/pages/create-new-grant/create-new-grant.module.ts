import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CreateNewGrantComponent } from './create-new-grant.component';
import { GrantService } from 'src/app/services/grant.service';
import { UserService } from 'src/app/services/user.service';

const routes: Routes = [
    {
        path: '',
        component: CreateNewGrantComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HttpClientModule,
        ReactiveFormsModule,
        TagInputModule
    ],
    declarations: [CreateNewGrantComponent],
    providers: [GrantService,UserService]
})
export class CreateNewGrantModule { }
