import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {SubscriptionService} from '../../services/subscription.service';
import {CustomerService} from '../../services/customer.service';
import {ISubscription} from '../../interfaces/isubscription';
import {AppSettings} from '../../app/appSettings';



/**
 * Generated class for the Subscription page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class Subscription {
  
  base_url : String;

  loading: Loading;

  membership : String;

  period : String;

  price : any;

  subscription : ISubscription[];

  amount : String;

  memberships : any;

  monthlyAmount : any;

  yearlyAmount : any;
 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private subscriptionService: SubscriptionService, private customerService: CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    
    //this.showLoading();

    
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
  this.getMembership();
    };

    getMembership(){
      this.customerService.getMemberships().subscribe(response => {
          this.memberships = (response.memberships);
          console.log(this.memberships);
      });  
    }
     

  getPrice(membership, period){
    if(membership == 'Affinity Privé')
    {
      this.showPriveMessage();
      return;
    }
    if(membership != null)
    {
      this.showLoading();
      var priceInfo = {'membership' : membership, 'period': 'Monthly'};
      this.subscriptionService.getPrice(priceInfo).subscribe(response => {
      this.monthlyAmount = response.price.amount;
      this.membership = membership;
      });
      var priceInfo = {'membership' : membership, 'period': 'Yearly'};
      this.subscriptionService.getPrice(priceInfo).subscribe(response => {
      this.yearlyAmount = response.price.amount;
      this.price = response.price;
      this.loading.dismiss();
      });
      document.getElementById('price').style.display = 'block';
      
    }
    else
    {
      this.showLoading();
      this.loading.dismiss();
      document.getElementById('price').style.display = 'none';
    }



    if(period == null)
    {
      return;
    }
    if(membership == null)
    {
      return;
    }
    var getP = {'membership' : membership, 'period': period};
    this.subscriptionService.getPrice(getP).subscribe(response => {
        this.amount = response.price.amount;
        console.log(response.price);
        console.log(response);


    });
  }



  openUrl(price){
    var user_details_id = window.localStorage.getItem('customer_id');
    window.open("https://web.theaffinityclub.com/affinity/public/subscribe/" + this.membership + "/" + this.period + "/" + price + "/" + user_details_id, '_blank', 'location=yes');
  }

  

  /*subscribe(){
    var user_details_id = window.localStorage.getItem('customer_id');
    this.subscriptionService.subscribe(this.membership, this.amount, this.period, user_details_id).subscribe();
  }*/
    
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Subscription');
    
  }

  showPriveMessage() {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Price on Request',
      message: 'Please contact us on +234 80822 52655 or membership@theaffinityclub.com to subscribe for this plan',
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
