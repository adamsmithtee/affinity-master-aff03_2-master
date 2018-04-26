import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';

import {MerchantService} from '../../services/merchant.service';
import {ExperienceService} from '../../services/experience.service';

import {AppSettings} from '../../app/appSettings';
import {Review} from '../review/review';

import {IOffer} from '../../interfaces/ioffer';
import {IMerchant} from '../../interfaces/imerchant';
import {IExperience} from '../../interfaces/iexperience';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-experience-details',
  templateUrl: 'experience-details.html',
})
export class ExperienceDetails {
  base_url : String;
	title : String;
  selectedExperience : IExperience;
  price : any;
  loading: Loading;
  /*name : String;
  image : String;*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private viewCtrl: ViewController) {
  	this.navParams.get('data');
    this.createViews(this.navParams.get('data'));
    this.base_url = AppSettings.BASE_URL;
    
  }

  createViews(experience) {
    this.selectedExperience = experience;
    console.log(this.selectedExperience);
    this.price = "N" + this.selectedExperience.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  
  openUrl(experience_id, price){
    var user_details_id = window.localStorage.getItem('customer_id');
    window.open("https://web.theaffinityclub.com/affinity/public/join_experience/" + experience_id + "/" + price + "/" + user_details_id, '_blank', 'location=yes');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  

  

}



