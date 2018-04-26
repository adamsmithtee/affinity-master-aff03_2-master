import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, Platform } from 'ionic-angular';
import {UpdateProfile} from '../update-profile/update-profile';
import {Details} from '../details/details';
import {GroupDetails} from '../group-details/group-details';
import {OfferDetails} from '../offer-details/offer-details';
import {EventDetails} from '../event-details/event-details';
import {Login} from '../login/login';

import {CustomerService} from '../../services/customer.service';
import {ICustomer} from '../../interfaces/icustomer';
import {IOffer} from '../../interfaces/ioffer';
import {IMerchant} from '../../interfaces/imerchant';
import {IGroup} from '../../interfaces/igroup';
import {IEvent} from '../../interfaces/ievent';
import {IBrief} from '../../interfaces/ibrief';

import {AppSettings} from '../../app/appSettings';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  rootPage:any;

  base_url : String;

  customer_id : string;

  filter : any;

  name : string;

  version : any;

  lastVersion : any;

  details : ICustomer;
  
  briefs : IBrief;

  homeSegment : string;

  offers : IOffer[];

  merchants : IMerchant[];

  groups : IGroup[];

  events : IEvent[];

  loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService, private loadingCtrl: LoadingController,private network: Network, private alertCtrl: AlertController, public platform: Platform) {
    this.customer_id =  window.localStorage.getItem('customer_id');
    this.getDetails(this.customer_id);
    this.base_url = AppSettings.BASE_URL;
    this.showLoading();
    this.getLatestAppVersion();
    this.homeSegment = "merchants";

    platform.ready().then(() => {
      setTimeout(() => {
        if(network.type =="none"){
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Connection status',
            subTitle: 'Ooops! could not find any internet connection',
            buttons: ['OK']
          });
          alert.present(prompt);
        }  
      }, 5000);
         
    });
  }

  updateProfile(){
    this.navCtrl.push(UpdateProfile);
  }
  

  ngOnInit(){
    console.log('ngOnInit Profile');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showGroupDetails(group) {
      this.navCtrl.push(GroupDetails, {
          data: group
      });
    }

    showEventDetails(event){
    this.navCtrl.push(EventDetails, {
        data: event
    });
  }
  filterList(){
    console.log(this.filter);
    if(!this.filter){
    return;
    }
    if(this.filter == 0){
    document.getElementById('merchants').style.display = "block";
    document.getElementById('offers').style.display = "block";
    document.getElementById('groups').style.display = "block";
    document.getElementById('events').style.display = "block";
    return;
    }
    if(this.filter == "Merchants"){
    document.getElementById('merchants').style.display = "block";
    document.getElementById('offers').style.display = "none";
    document.getElementById('groups').style.display = "none";
    document.getElementById('events').style.display = "none";
    return;
    }
    if(this.filter == "Offers"){
    document.getElementById('merchants').style.display = "none";
    document.getElementById('offers').style.display = "block";
    document.getElementById('groups').style.display = "none";
    document.getElementById('events').style.display = "none";
    return;
    }
    if(this.filter == "Groups"){
    document.getElementById('merchants').style.display = "none";
    document.getElementById('offers').style.display = "none";
    document.getElementById('groups').style.display = "block";
    document.getElementById('events').style.display = "none";
    return;
    }
    if(this.filter == "Events"){
    document.getElementById('merchants').style.display = "none";
    document.getElementById('offers').style.display = "none";
    document.getElementById('groups').style.display = "none";
    document.getElementById('events').style.display = "block";
    return;
    }
    


  }


  getLatestAppVersion(){
    this.lastVersion = 1.4;
    this.customerService.getLatestAppVersion().subscribe(response => {
        this.version = response.version;

        if(this.lastVersion != this.version)
        {
          document.getElementById('version').style.display = "block";
        }
        
    });
  }

  getDetails(id){
    this.customerService.getCustomerDetails(id).subscribe(response => {
        this.details = <ICustomer>response.customer;
        
        
    });

    this.customerService.getOffers().subscribe(response => {
        this.offers = response.offers;
        
    });




    this.customerService.getBriefs(id).subscribe(response => {
      this.briefs = <IBrief>response.response;
      /*this.offers = this.briefs.offers;
      console.log(this.offers);*/
      this.merchants = this.briefs.merchants;
      this.groups = this.briefs.groups;
      this.events = this.briefs.events;
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getDetails(this.customer_id);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  showItemDetails(selectedType, item){
    this.navCtrl.push(Details, {
        type: selectedType,
        data: item
    });
  }
  showOfferDetails(selectedType, offer){
    this.navCtrl.push(OfferDetails, {
        type: selectedType,
        data: offer
    });
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }
}



