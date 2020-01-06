import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {

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