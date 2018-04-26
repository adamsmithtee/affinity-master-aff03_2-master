import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class MerchantService{

    api : string;
    
    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getMerchantDetails(merchant){
        return this.http.get(this.api+'merchants/filter/'+merchant)
                .map(res => res.json());
    }

    //getMerchantsAround(lnglat){
        //return this.http.get(this.api+'merchants/around/'+lnglat)
                //.map(res => res.json());
    //}

    getMerchantsAround(){
        return this.http.get(this.api+'merchants')
                .map(res => res.json());
    }   
    getMerchantOffers(merchant_id){
        return this.http.get(this.api+'merchants/get/offers/' + merchant_id)
                .map(res => res.json());
    }            
    getMerchants(){
        return this.http.get(this.api+'merchants')
                .map(res => res.json());
    }

    getSearchedMerchants(searchedParameter, category){
        return this.http.get(this.api+'merchants/search/' + searchedParameter + '/' + category)
                .map(res => res.json());
    }

    getSortedMerchants(item){
        return this.http.get(this.api+'merchants/sorted/' + item)
                .map(res => res.json());
    }

    getCategories(){
        return this.http.get(this.api+'categories')
                .map(res => res.json());
    }

    addReview(review){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'reviews', JSON.stringify(review), {headers: headers}) 
                    .map(res => res.json());
    }

}