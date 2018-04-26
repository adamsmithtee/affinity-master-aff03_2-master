import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../app/appSettings';
 
@Injectable()
export class CustomerService{
    
    api : string;

    constructor(public http: Http) {
        this.http = http;
        this.api = AppSettings.API_ENDPOINT;
    }

    getCustomerDetails(customer_id){
        return this.http.get(this.api+'customers/'+ customer_id)
                .map(res => res.json());
    }

    verifyUserValidity(customer_id, offer_id){
        return this.http.get(this.api+'customers/verify_validity/'+ customer_id + '/' + offer_id)
                .map(res => res.json());
    }

    getMemberships(){
        return this.http.get(this.api+'customers/get/memberships')
                .map(res => res.json());
    }

    postCustomer(customer) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/store', JSON.stringify(customer), {headers: headers}) 
                    .map(res => res.json());
        
    }

    getSubDetails(customer_id){
        return this.http.get(this.api+'customers/sub/'+ customer_id)
                .map(res => res.json());
    }

    forgot(email) {

        
        return this.http.get(this.api+'forgot/' + email) 
                    .map(res => res.json()); 
        
    }

    getLatestAppVersion(){
        return this.http.get(this.api+'version') 
                    .map(res => res.json());
    }

    updateCustomer(customer) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put(this.api+'customers/'+customer.customer_id, JSON.stringify(customer), {headers: headers}) 
                    .map(res => res.json());
        
    }

    updateCustomerAvatar(customer){

        var headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        
        return this.http.put(this.api+'customers/'+customer.customer_id, JSON.stringify(customer), {headers: headers}) 
                    .map(res => res.json());

    }

    getBriefs(customer_id){
        return this.http.get(this.api+'customers/'+ customer_id + '/briefs')
                .map(res => res.json());
    }

    getOffers(){
        return this.http.get(this.api+'merchants/recent/offers')
                .map(res => res.json());
    }

    getInterests(customer_id){
        return this.http.get(this.api+'customers/'+ customer_id + '/interests')
                .map(res => res.json());
    }

    getGroups(customer_id){
        return this.http.get(this.api+'customers/'+ customer_id + '/groups')
                .map(res => res.json());
    }


    getEvents(customer_id){
        return this.http.get(this.api+'customers/'+ customer_id + '/events')
                .map(res => res.json());
    }

    getJoinedEvents(customer_id){
        return this.http.get(this.api+'customers/events/'+ customer_id)
                .map(res => res.json());
    }

    getJoinedGroups(customer_id){
        return this.http.get(this.api+'customers/groups/'+ customer_id)
                .map(res => res.json());
    }

    getJoinedExperiences(customer_id){
        return this.http.get(this.api+'customers/experiences/'+ customer_id)
                .map(res => res.json());
    }

    postJoinGroup(group) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/group/join', JSON.stringify(group), {headers: headers}) 
                    .map(res => res.json());
        
    }
    leaveJoinGroup(group) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/group/leave', JSON.stringify(group), {headers: headers}) 
                    .map(res => res.json());
        
    }

    postJoinExperience(experience) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/experience/join', JSON.stringify(experience), {headers: headers}) 
                    .map(res => res.json());
        
    }

    leaveJoinExperience(experience) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/experience/leave', JSON.stringify(experience), {headers: headers}) 
                    .map(res => res.json());
        
    }


    postJoinEvent(event) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/event/join', JSON.stringify(event), {headers: headers}) 
                    .map(res => res.json());
        
    }
    leaveJoinEvent(event) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'customers/event/leave', JSON.stringify(event), {headers: headers}) 
                    .map(res => res.json());
        
    }

}