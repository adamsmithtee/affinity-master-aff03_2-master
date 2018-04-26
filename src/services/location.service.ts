import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class LocationService{
    
    api : string;

    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getCountries(){
        return this.http.get(this.api+'locations')
                .map(res => res.json());
    }

    getStates(country){
        return this.http.get(this.api+'locations/states/' + country)
                .map(res => res.json());
    }

}