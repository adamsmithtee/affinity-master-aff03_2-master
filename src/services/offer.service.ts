import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class OfferService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getOffers(){
        return this.http.get(this.api+'merchants/offers')
                .map(res => res.json());
    }

    getLocations(){
        return this.http.get(this.api+'merchant/cities')
                .map(res => res.json());
    }

}

