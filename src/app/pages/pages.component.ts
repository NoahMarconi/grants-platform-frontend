import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

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
        private modalController: ModalController,
        public events: Events
    ) {

        this.initializeApp();
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

        modal.onDidDismiss()
            .then((data) => {
                const reload = data['data'];
                // console.log("reload", reload);
                if (reload && reload.hasOwnProperty('reload') && reload.reload) {
                    this.events.publish('my-grants', true);
                }
            });

        return await modal.present();

    }
}
