import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import * as $ from 'jquery';
import {AppSettings} from '../../app/appSettings';
import {TransactionService} from '../../services/transaction.service';
import {CustomerService} from '../../services/customer.service';
import {MerchantService} from '../../services/merchant.service';
import {ITransaction} from '../../interfaces/itransaction';
import {IMerchant} from '../../interfaces/imerchant';
import {IOffer} from '../../interfaces/ioffer';

/**
 * Generated class for the Card page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class Card {

  loading: Loading;

  
  base_url : String;

  customer_id : any;

  customer : any;

  membership : any;

  expiryDate : String;

  firstname : String;

  lastname : String;

  end_date : String;

  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,  private platform : Platform,
    private merchantService: MerchantService, private transactionService: TransactionService, private customerService: CustomerService, private events: Events, private screenOrientation: ScreenOrientation) {

    this.membership = window.localStorage.getItem('membership');
    screenOrientation.unlock();

    this.customer_id = window.localStorage.getItem('customer_id');

    this.customerService.getCustomerDetails(this.customer_id).subscribe(response => {
      this.customer = response.customer;
      this.firstname = this.customer.firstname;
      this.lastname = this.customer.lastname;
      console.log(this.customer.firstname);
    });

    this.customerService.getSubDetails(this.customer_id).subscribe(response => {
      this.end_date = response.expiryDetails.end_date.substring(0,7).replace(/-/g, "/");
      console.log(this.expiryDate);
    });
  }

  ionViewDidLoad() {
    
    this.base_url = AppSettings.BASE_URL;
    
  }
  
  


  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  
  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Claim Reward',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  


  
}
