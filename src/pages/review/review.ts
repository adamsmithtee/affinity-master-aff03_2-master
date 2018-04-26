import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import {MerchantService} from '../../services/merchant.service';

/**
 * Generated class for the Review page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class Review {

	merchant_id : String;
	customer_id : String;
	loading: Loading;

	reviewForm = {
	     review: '',
	     rating: '1',
	     customer_id: '',
	     merchant_id: ''
	  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private alertCtrl: AlertController, private loadingCtrl: LoadingController, private merchantService : MerchantService) {
  	this.reviewForm.merchant_id = this.navParams.get('merchant');
  	this.reviewForm.customer_id = window.localStorage.getItem('customer_id');
  }

  submitReview(review){
  	/*{"customer_id": "CS1","review": "A nice and serene environment","rating": 5,"merchant_id": "MR12908"}*/
  	this.showLoading();

  	this.merchantService.addReview(review).subscribe(response => {
        this.loading.dismiss();
        console.log(response);
        if (!response.error){
        	//Successfully posted the review
        	this.showMsg("Thank you for the review.");
        }else{
        	this.showMsg("Review could not be submitted, please try again later.");
        }
      });
  }

    showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...'
	    });
	    this.loading.present();
	  }

	  showMsg(text) {
	 
	    let alert = this.alertCtrl.create({
	      title: 'Merchant Review',
	      subTitle: text,
	      buttons: ['OK']
	    });
	    alert.present(prompt);
	  }

}
