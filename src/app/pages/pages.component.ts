import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CreateNewGrantComponent } from './create-new-grant/create-new-grant.component';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
})

export class PagesComponent implements OnInit {
    public appPages = [
        {
            title: 'My Grants',
            url: '/pages/my-grants',
            icon: 'gp-grant'
        },
        {
            title: 'Latest Grants',
            url: '/pages/latest-grants',
            icon: 'gp-latest-grant'
        }, {
            title: 'Trending Grants',
            url: '/pages/trending-grants',
            icon: 'gp-trending-grants'
        },
        {
            title: 'Transaction History',
            url: '/pages/transaction-history',
            icon: 'gp-transaction-history'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private modalController: ModalController) {

        this.initializeApp();
        console.log('page route');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    ngOnInit() {
    }

    async createNewGrant() {
        console.log("New Grant")
        const modal = await this.modalController.create({
            component: CreateNewGrantComponent,
            cssClass: 'custom-modal-style',
            mode: "ios"
        })
        return await modal.present();

    }
}
