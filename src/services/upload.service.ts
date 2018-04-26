import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class UploadService{
    
    api : string;

    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    

    

}