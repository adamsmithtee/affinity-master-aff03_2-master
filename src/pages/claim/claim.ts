import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';


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
  selector: 'page-claim',
  templateUrl: 'claim.html',
})
export class Claim {

  loading: Loading;

  pin : any;

  all_merchants : any;

  offer_details : any;

  transaction : any;

  transactionHistory : any;
  
  offers : IOffer;

  merchant : IMerchant;

  merchant_name : String;

  message : any;

  name : string;

  scanned : any;

  today: number;

  totalAmount : number;

  discountedTotal: number;

  amount_payable : any;

  valid : boolean;

  searchMerchantString = '';

  merchantInitial = [];

  merchants : any;

  firstname : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner, private platform : Platform,
    private merchantService: MerchantService, private transactionService: TransactionService, private customerService: CustomerService, private events: Events) {

    events.subscribe('user:signedIn', (userEventData) => {
      this.firstname = userEventData.firstname;
      console.log(this.firstname);
      
    });
  }

  ionViewDidLoad() {
    this.firstname = window.localStorage.getItem('firstname'); 
    console.log('ionViewDidLoad Claim');
  }
  
  ngOnInit(){
    this.getTransactions();
    this.getAllMerchants();
    this.transaction = {
          customer_id : window.localStorage.getItem('customer_id'),
          merchant_id :'',
          amount : '',  
          remarks : '',
          search_merchant : '',
          

          
    };

    this.valid = false;

    this.today =  Date.now();

    this.name = window.localStorage.getItem('customer_name');

    console.log(name);

 
  }

  showVerifyForm(){
    
  	document.getElementById('claim1').style.display = "none";
  	document.getElementById('claim2').style.display = "block";
  }

  showPin(){
    this.loading.dismiss();

    document.getElementById('pin').style.display = "block";
  }

  trackTransaction(transaction){

    this.valid = false;

    this.showLoading();

    // Confirm if merchant ID is valid 

    this.merchantService.getMerchantDetails(transaction.merchant_id).subscribe(response => {
      console.log(response);

            if (!response.error){
              // this.showMessage("Merchant Valid");

              this.merchantInitial = response.merchant;
              this.merchant = response.merchant;
              
              this.showVerifyForm();
            }
            else{
              console.log("Else reached");
              this.showMessage("Merchant Not Valid");
              this.loading.dismiss();
            }

    });

  }

  verifyUserValidity(){
    if(!this.transaction.customer_id || !this.transaction.offer_id || !this.transaction.merchant_id) {
      this.showMessage('Please fill all mandatory fields');
      return;
    }
    this.showLoading();
    this.customerService.verifyUserValidity(this.transaction.customer_id, this.transaction.offer_id).subscribe(response => {
      console.log(response);

            if (response.error){
              this.loading.dismiss();
              this.message = response.message;
              
              this.showMessage(this.message);
              
            }
            else{
              this.loading.dismiss();
              this.showVerifyForm();
              
            }

    });

  }

  searchMerchants(searchbar) {
          // reset countries list with initial call
          this.merchants = this.merchantInitial;
          // set q to the value of the searchbar
      var q = searchbar.value;

      // if the value is an empty string don't filter the items
      if (q.trim() == '') {
          return;
      }

      this.merchants = this.merchants.filter((v) => {
          if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
              return true;
          }
          return false;
      })
  }

  calculateAmountPayable(offer_id, amount) {
    console.log(offer_id);
    if(offer_id ===null)
    {
      return;
    }
    if(amount === null)
    {
      return;
    }

    this.transactionService.getOfferDetails(offer_id).subscribe(response => {
      

            if (!response.error){
                this.offer_details = response.offer;
                console.log(this.offer_details);
                if (!isNaN(+('' + this.offer_details.offer_name))) {
                console.log(this.offer_details.offer_name);
                this.amount_payable = amount - ((amount/100) * this.offer_details.offer_name);
                this.transaction.amount_payable = this.amount_payable;
                this.transaction.transaction_type = this.offer_details.tagline;
                this.transaction.offer = this.offer_details.offer_name;
                //this.showMessage("Amount Payable is " + this.amount_payable);
                }
                else
                {
                    this.transaction.amount_payable = amount;
                }
              
            }
            else{
                
                console.log(response);
                this.showMessage("Error Persisting");
              }     
            

    });
  }
  verifyTransaction(){

      console.log("Verification method called");

      console.log("Enteered Pin : " + this.pin);

      console.log(this.merchant);

      var enteredPin = this.pin;


      if (enteredPin == this.merchant.verification_pin){
          console.log("Equal");
          // Equal.. persist database...
          console.log(this.transaction);

          this.transactionService.postTransaction(this.transaction).subscribe(response => {
              if (!response.error){
                  // Record Added Successfully...
                  this.showMessage(response.message);
                  this.pin="";
                  this.loading.dismiss();

                  document.getElementById('claim2').style.display = "none";

                  if(response.message =="Transaction is successful")
                  {
                    document.getElementById('claim3').style.display = "block";
                  }
                  else
                  
                  {
                    document.getElementById('claim1').style.display = "block";
                    this.showMessage(response.message);
                  }

              } 
              else{
                // Error persisting transaction...
                  this.pin="";
                console.log("Error Persisting");
                this.showMessage("Error Persisting");
              }         
               
            });          
          
      }else{
        console.log("Not Equal");
        this.showMessage("Incorrect Merchant PIN, please check and try again");
      }

  }

  submitClaim(){
    this.transactionService.postTransaction(this.transaction).subscribe(response => {
      if (!response.error){
          // Record Added Successfully...
          this.showMessage(response.message);
          this.pin="";
          this.loading.dismiss();

          document.getElementById('claim2').style.display = "none";
          document.getElementById('claim3').style.display = "block";
      } 
      else{
        // Error persisting transaction...
          this.pin="";
        console.log("Error Persisting");
        this.showMessage("Error Persisting");
      }         
       
    }); 
  }

  cancelVerification(){
  	document.getElementById('claim1').style.display = "block";
  	document.getElementById('claim2').style.display = "none";
  }

  claimHide(){
    if(document.getElementById('claim2').innerHTML != null)
    {
      document.getElementById('claim2').style.display = "none";
    }
    if(document.getElementById('claim3').innerHTML != null)
    {
      document.getElementById('claim3').style.display = "none";
    }  
    
  }
  historyHide(){
    if(document.getElementById('claim2').innerHTML != null)
    {
      document.getElementById('claim2').style.display = "none";
    }
    if(document.getElementById('claim3').innerHTML != null)
    {
      document.getElementById('claim3').style.display = "none";
    }  
    
  }

  cancelVerification1(){
    document.getElementById('claim1').style.display = "block";
    document.getElementById('claim2').style.display = "none";
    document.getElementById('claim3').style.display = "none";
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showClaim1(){
    this.cancelVerification();
    document.getElementById('claim1').style.display = "block";
  }
  showInput(){
    document.getElementById('merchant-input').style.display = "block";
  }

  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Redeem Offer',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  getAllMerchants(){
    this.merchantService.getMerchants().subscribe(response => {
          this.all_merchants = (response.merchants);
    });      
  }
   
  getMerchantInfo(){
    this.merchantService.getMerchantDetails(this.transaction.search_merchant).subscribe(response => {
      console.log("merchant details received");
      console.log(response);

      if (!response.error){
        if(!response.merchant)
        {
          return;
        }
        this.merchant = response.merchant;
        this.merchant_name = this.merchant.name;
        this.transaction.merchant_id = this.merchant.merchant_id;
        this.getMerchantOffers();
      }else{
        console.log("Else reached");
        this.showMessage("Merchant Not Valid");
        
      }

    });
  }

  getMerchantOffers(){
    if(!this.merchant.merchant_id)
    {
     return;
    }
    this.merchantService.getMerchantOffers(this.merchant.merchant_id).subscribe(response => {
      
      console.log(response);

      if (!response.error){
        this.offers = response.offers;
        this.offers = this.offers;
        
      }else{
        console.log("Else reached");
        this.showMessage("");
        
      }

    });
  }
  submitRating(rate, remarks, merchant_id){
    console.log(rate);
    console.log(merchant_id);
    console.log(this.transaction.customer_id);
    var rating = rate * 20;
    var rating_data = {rating : rating, remarks : remarks, merchant_id : merchant_id, customer_id : this.transaction.customer_id};
    this.transactionService.postRating(rating_data).subscribe(response => {
      if (!response.error){
          // Record Added Successfully...
          this.loading.dismiss();
          this.showMessage(response.message);
          

          document.getElementById('claim2').style.display = "none";
          document.getElementById('claim3').style.display = "block";
          this.navCtrl.setRoot(Claim); 
      } 
      else{
        // Error persisting transaction...

        console.log("Error Persisting");
        this.showMessage("Error Persisting");
      }         
       
    }); 
    
                  
  }

  getTransactions(){
    this.transactionService.getTransactions(window.localStorage.getItem('customer_id')).subscribe(response => {
      this.transactionHistory = response.transactions;
      console.log(response.transactions);
      let total = 0;
      let discountedAmount = 0;
      for (var i = 0; i < this.transactionHistory.length; i++) {

        
        if (this.transactionHistory[i].amount) {
            total += this.transactionHistory[i].amount *1;
            discountedAmount += this.transactionHistory[i].amount - this.transactionHistory[i].amount * (this.transactionHistory[i].offer /100);
            this.totalAmount = total;
            this.discountedTotal = discountedAmount;
        }    
      }
    });

  } 

  scanQR(){

    this.platform.ready().then(() => {
      this.barcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
        this.scanned = barcodeData.text;
        if(this.transaction.merchant_id == this.scanned)
        {
          this.submitClaim();
        }
        else
        {
          this.showMessage("Error! This scanned code does not match selected vendor");
          return;
        }
        //this.getMerchantInfo();
        //retrieve merchant information after we see barcode
        //this.getMerchantInfo();
      }, (err) => {
        // An error occurred
        console.log(err);
      });           
    });

  }

}
