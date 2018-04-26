import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class TransactionService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    postTransaction(transaction) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'transactions', JSON.stringify(transaction), {headers: headers}) 
                    .map(res => res.json());
        
    }

    postRating(rating) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(rating);
        return this.http.post(this.api+'reviews', JSON.stringify(rating), {headers: headers}) 
                    .map(res => res.json());
        
    }

    hideTransaction(transaction_id){
        
        return this.http.get(this.api+'transactions/hide/' + transaction_id).map(res => res.json());
    }

    getOfferDetails(offer_id){
        return this.http.get(this.api+'offers/'+offer_id)
                .map(res => res.json());
    }

    getTransactions(customer_id){
        return this.http.get(this.api+'customers/' + customer_id + '/transactions')
                .map(res => res.json());
    }
}