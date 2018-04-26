import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class GroupService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getGroups(){
        return this.http.get(this.api+'groups')
                .map(res => res.json());
    }

    getGroupEvents(group_id){
        return this.http.get(this.api+'groups/'+ group_id + '/events')
                .map(res => res.json());   
    }
}