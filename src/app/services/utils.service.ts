import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface ILoader {
    loading: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    private loaderSubscription = new Subject<ILoader>();
    onLoaderChange = this.loaderSubscription.asObservable();

    private loadersCount = 0;

    constructor() { }


    startLoader(message: string = '') {
        if (!this.loadersCount) {
            this.loaderSubscription.next({ loading: true, message });
        }
        this.loadersCount += 1;
    }

    stopLoader() {
        if (this.loadersCount) {
            this.loadersCount -= 1;
        }

        if (!this.loadersCount) {
            this.loaderSubscription.next({ loading: false, message: '' });
        }
    }

    dataURLtoFile(dataurl, filename) {
        console.log('dataurl', dataurl);
        console.log('filename', filename);

        if (dataurl) {
            let arr = dataurl.split(',');
            console.log('arr', arr);
            let mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            console.log('mime', mime);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename || 'temp', { type: mime });
        } else {
            return false;
        }
    }

    getFormControlValues(form: FormGroup, controlName: string) {
        const control = form.controls[controlName];
        if (control) {
            return control.value;
        } else {
            return undefined;
        }
    }

    generateUUID(length: number = 16, options?: { numericOnly: boolean }) {
        let text = '';
        const possible =
            options && options.numericOnly ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}  