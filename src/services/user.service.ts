import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class UserService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getUsers(){
        return this.http.get(this.api+'users')
                .map(res => res.json());
    }

    postUser(user) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'users', JSON.stringify(user), {headers: headers}) 
                    .map(res => res.json());
        
    }

    updateUser(user) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(this.api+'users/'+user.details_id, JSON.stringify(user), {headers: headers}) 
                    .map(res => res.json());
        
    }

}