import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import {OfferDetails} from '../offer-details/offer-details';
import {CustomerService} from '../../services/customer.service';
import {OfferService} from '../../services/offer.service';
import {IOffer} from '../../interfaces/ioffer';
import {AppSettings} from '../../app/appSettings';

/**
 * Generated class for the Offers page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class Offers {
  
  base_url : String;

  offers : IOffer[];

  loading: Loading;

  membership: any;

  memberships: any;

  data: any;

  item: any;

  cities: any

  city: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private offerService: OfferService, private loadingCtrl: LoadingController, private customerService: CustomerService) {
    this.offers = [];
    this.getOffers();
    this.showLoading();
    this.getMembership();
    this.getLocations();

    console.log(this.navParams.get('data'));
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ngOnInit(){
  this.base_url = AppSettings.BASE_URL;
        
    };

    viewDetails(offer_name, details) {
    let alert = this.alertCtrl.create({
        title: offer_name,
        message: details, 

        buttons: ['Dismiss']
     });
     alert.present();
}

onSwipeLeft(){
  alert('yeay yea');
}

filterByMembership(){

  if (this.membership == '0'){
    this.resetItems();
  }else if(this.membership && this.membership.trim() != '') {
    this.offers = this.data.filter((item) => {
      return (item.target_members == this.membership);
    })
  }
}

filterByLocation(){

  if (this.city == '0'){
    this.resetItems();
  }else if(this.city && this.city.trim() != '') {
    this.offers = this.data.filter((item) => {
      return (item.city == this.city);
    })
  }
}

  getMembership(){
    this.customerService.getMemberships().subscribe(response => {
        this.memberships = (response.memberships);
        console.log(this.memberships);
    });  
  }

  getLocations(){
    this.offerService.getLocations().subscribe(response => {
        this.cities = (response.cities);
        console.log(this.cities);
    });  
  }

  getOffers() : void{
        this.offerService.getOffers().subscribe(response => {
        this.offers = response.offers;
        this.data = response.offers;
        console.log(response.offers);
    },
      err => console.warn(err),
      () => {
        this.loading.dismiss();
      });
  }

  resetItems(){
    this.offers = this.data;
  }

  filter(ev: any) {
    // Reset items back to all of the items
    if (ev.target.value == "")
      this.resetItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.offers = this.offers.filter((item) => {
        return (item.city.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Offers');
  }

  showOfferDetails(selectedType, offer){
    this.navCtrl.push(OfferDetails, {
        type: selectedType,
        data: offer
    });
  }
}
