import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';

import {MerchantService} from '../../services/merchant.service';
import {OfferService} from '../../services/offer.service';

import {AppSettings} from '../../app/appSettings';
import {Review} from '../review/review';

import {IOffer} from '../../interfaces/ioffer';
import {IMerchant} from '../../interfaces/imerchant';


/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetails {
  base_url : String;
	
  title : String;
  
  selectedOffer : IOffer;
  
  loading: Loading;
  
  memberships: any;

  membership: any;

  data: any;

  item: any;

  city: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private viewCtrl: ViewController) {
  	this.navParams.get('data');
    this.createViews(this.navParams.get('data'));
    this.base_url = AppSettings.BASE_URL;
    
  }

  createViews(offer) {
    this.selectedOffer = offer;
    console.log(this.selectedOffer);
  }
  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  

  

}



