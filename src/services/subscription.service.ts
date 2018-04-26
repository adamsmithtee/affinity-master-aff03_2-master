import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class SubscriptionService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getPrice(subscription){
        return this.http.post(this.api+'get_price', subscription)
                .map(res => res.json());
    }

    /*subscribe(membership, amount, period, user_details_id){
        return this.http.post(this.api+'get_price', subscription)
                .map(res => res.json());
    }*/
}

/**
 * @Injectable()  
export class ArticleService {  
    private jsonFileURL: string = "./app/jsondata/article.json";  
    constructor(private http: Http) {}  
    //    
    getArticles(): Observable < IArticle[] > {  
        return this.http.get(this.jsonFileURL).map((response: Response) => {  
            return <IArticle[] > response.json()  
        }).catch(this.handleError);  
    }  
    //    
    private handleError(errorResponse: Response) {  
        console.log(errorResponse.statusText);  
        return Observable.throw(errorResponse.json().error || "Server error");  
    }  
}
 */