import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';
import * as $ from 'jquery';
import {AppSettings} from '../../app/appSettings';
import {TransactionService} from '../../services/transaction.service';
import {CustomerService} from '../../services/customer.service';
import {MerchantService} from '../../services/merchant.service';
import {ITransaction} from '../../interfaces/itransaction';
import {IMerchant} from '../../interfaces/imerchant';
import {IOffer} from '../../interfaces/ioffer';

/**
 * Generated class for the Claim page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class Transactions {

  loading: Loading;

  pin : any;

  base_url : String;

  transaction : any;

  total : any;

  discountedAmount : any;

  transactionHistory : any;
  
  savedTotal : any;

  totalAmount : any;

  discountedTotal: any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,  private platform : Platform,
    private merchantService: MerchantService, private transactionService: TransactionService, private customerService: CustomerService, private events: Events) {

  }

  ionViewDidLoad() {
    
    this.base_url = AppSettings.BASE_URL;
    
    this.getTransactions();
  }
  
  


  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  
  showMessage(text) {
    let alert = this.alertCtrl.create({
      title: 'Transactions',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  


  hideTransaction(transaction_id){
        let alert = this.alertCtrl.create({
        title: 'Confirm',
        message: 'Are you sure you want to hide this item permanently? This action cannot be reversed',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Hide',
            handler: () => {
              this.transactionService.hideTransaction(transaction_id).subscribe(response => {
                  if (!response.error){
                  this.getTransactions();
                  this.showMessage(response.message);

                  }
                  else{
                    this.showMessage("Oops! An error occured");
                  }
              });
              console.log('Hide clicked');
            }
          }
        ]
      });
      alert.present();
    
    
  }

  getTransactions(){
    this.showLoading();
    this.transactionService.getTransactions(window.localStorage.getItem('customer_id')).subscribe(response => {
      this.transactionHistory = response.transactions;
      console.log(response.transactions);
      this.total = 0;
      this.discountedAmount = 0;
      for (var i = 0; i < this.transactionHistory.length; i++) {

        
        if (this.transactionHistory[i].amount) {
            this.total += this.transactionHistory[i].amount *1;
            this.discountedAmount += this.transactionHistory[i].amount - this.transactionHistory[i].amount * (this.transactionHistory[i].offer /100);
        }    
      }
      this.savedTotal = this.total - this.discountedAmount;
      setTimeout(this.animate, 2000);
      console.log(this.savedTotal);
    });
    this.loading.dismiss();
  }
  
  animate(){
    document.getElementById('savedTotal').style.visibility = "visible";
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
  }
}
