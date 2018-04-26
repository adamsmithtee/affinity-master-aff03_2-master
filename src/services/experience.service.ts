import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class ExperienceService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getExperiences(){
        return this.http.get(this.api+'experiences')
                .map(res => res.json());
    }

    /*getExperiences(experience_id){
        return this.http.get(this.api+'experiences/'+ experience_id + '/experiences')
                .map(res => res.json());   
    }*/
}