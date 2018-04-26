import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from '../app/appSettings';

 
@Injectable()
export class AuthService {
    
    isLoggedin: boolean;
    AuthToken;

    api : string;
    

    constructor(public http: Http) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
        this.api = AppSettings.API_ENDPOINT;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('credentials', token);
        this.useCredentials(token);
        
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('credentials');
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    authenticate(user) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(user);
        return this.http.post(this.api+'login', JSON.stringify(user), {headers: headers}) 
                    .map(res => res.json());
        
    }
    
    logout() {
        this.destroyUserCredentials();
    }
}

