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
import { CreateNewGrantModule } from './create-new-grant/create-new-grant.module';
import { CreateNewGrantComponent } from './create-new-grant/create-new-grant.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        // NgxChartsModule,
        CreateNewGrantModule,
        PagesRoutingModule
        // RouterModule.forChild(routes)
        // MiscellaneousModule
    ],
    declarations: [
        PagesComponent
    ],
    entryComponents: [CreateNewGrantComponent],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }]
})
export class PagesModule {

}
