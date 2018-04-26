import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, ViewController, Platform } from 'ionic-angular';

import {MerchantService} from '../../services/merchant.service';

import { CallNumber } from '@ionic-native/call-number';

import {AppSettings} from '../../app/appSettings';
import {Review} from '../review/review';

import {IOffer} from '../../interfaces/ioffer';
import {IMerchant} from '../../interfaces/imerchant';
import {IGroup} from '../../interfaces/igroup';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {
  base_url : String;
	title : String;
  offer : IOffer;
  offers : any[];
  reviews : any[];
  subscriber_avatar : any;
  item : any;
  seconds : any;
  interval : any;
  loading: Loading;
  /*name : String;
  image : String;*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private viewCtrl: ViewController, private callNumber: CallNumber, public platform: Platform) {
  	this.navParams.get('data');
    this.base_url = AppSettings.BASE_URL;
    this.title = this.navParams.get('type') + " Details";
    this.createViews(this.navParams.get('type'), this.navParams.get('data'));
  }

  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  createViews(type, data){
    console.log(this.navParams.get('data'));
    console.log(type);
    this.item = data;
    this.offers = [data];
    switch(type){
      case "Deal":
        break;
      case "Merchant":

      //Fetch Merchant info show the array of offers under this merchant
        this.showLoading();
        this.merchantService.getMerchantOffers(data.merchant_id).subscribe(response => {
        console.log(response);
          this.offers = response.offers;
          console.log(this.offers);
          this.reviews = response.reviews;
          this.loading.dismiss();
        });
        
      break;
    }
  }

  timeSince(date) {
    var now : any = new Date();
    var r_date : any = new Date(date);
    this.seconds = Math.floor((now - r_date) / 1000);

    this.interval = Math.floor(this.seconds / 31536000);

    if (this.interval > 1) {
      return this.interval + " years";
    }
    this.interval = Math.floor(this.seconds / 2592000);
    if (this.interval > 1) {
      return this.interval + " months";
    }
    this.interval = Math.floor(this.seconds / 86400);
    if (this.interval > 1) {
      return this.interval + " days";
    }
    this.interval = Math.floor(this.seconds / 3600);
    if (this.interval > 1) {
      return this.interval + " hours";
    }
    this.interval = Math.floor(this.seconds / 60);
    if (this.interval > 1) {
      return this.interval + " minutes";
    }
    return Math.floor(this.seconds) + " this.seconds";
  }

  dateOnly(timestamp){
    var dateArray : any[] = timestamp.split(" ");
    var date : any = dateArray[0];
    return date;
  }

  call(number){
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }  

  showOnMap(addr){
    //http://maps.google.com/maps?q=24.197611,120.780512
    //window.open('maps://?q='+addr, '_system')
    window.open('http://maps.google.com/maps?q='+addr);
  }

  mailto(email) {
    this.platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }

  sendCall(phone){
    window.open('tell:'+phone);
  }

  openAddReview(merchant_id){
    this.navCtrl.push(Review, {
        merchant: merchant_id
    });
  }

}



