import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
// import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';

import { PagesComponent } from './pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { PrivateKeyModelComponent } from './private-key-model/private-key-model.component';
import { UserService } from '../services/user.service';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    declarations: [
        PagesComponent,
        PrivateKeyModelComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PagesRoutingModule,
        // RouterModule.forChild(routes)
        // MiscellaneousModule
    ],
    entryComponents: [PrivateKeyModelComponent],
    providers: [
        StatusBar,
        SplashScreen,
        UserService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class PagesModule {

}
