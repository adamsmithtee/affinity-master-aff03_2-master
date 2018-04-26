import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';

import {CustomerService} from '../../services/customer.service';
import {MerchantService} from '../../services/merchant.service';
import {EventService} from '../../services/event.service';

import {AppSettings} from '../../app/appSettings';
import {Review} from '../review/review';

import {IOffer} from '../../interfaces/ioffer';
import {IMerchant} from '../../interfaces/imerchant';
import {IEvent} from '../../interfaces/ievent';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetails {
  base_url : String;
	title : String;
  selectedEvent : IEvent;
  
  loading: Loading;
  /*name : String;
  image : String;*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, private loadingCtrl: LoadingController, private customerService : CustomerService, private alertCtrl: AlertController, private modalCtrl: ModalController, private viewCtrl: ViewController) {
  	this.navParams.get('data');
    this.createViews(this.navParams.get('data'));
    this.base_url = AppSettings.BASE_URL;
    
  }

  createViews(event) {
    this.selectedEvent = event;
    console.log(this.selectedEvent);
  }
  
  attending(event_id) {
    console.log("Attending Event : "+ event_id);
    this.showLoading();

    var customer_id = window.localStorage.getItem('customer_id');

    var event = {'event_id' : event_id, 'customer_id': customer_id};

    this.customerService.postJoinEvent(event).subscribe(response => {
        if (!response.error){
        this.loading.dismiss();
          this.showMessage(response.message);
          //this.navCtrl.push(EventPage);           
        }
    });
    //
  }

  showMessage(text) {
    /*setTimeout(() => {
      //this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Events',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  

  

}



