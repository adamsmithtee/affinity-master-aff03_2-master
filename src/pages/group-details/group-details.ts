import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';

import {CustomerService} from '../../services/customer.service';
import {MerchantService} from '../../services/merchant.service';
import {GroupService} from '../../services/group.service';

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
  selector: 'page-group-details',
  templateUrl: 'group-details.html',
})
export class GroupDetails {
  base_url : String;
	title : String;
  selectedGroup : IGroup;
  
  loading: Loading;
  /*name : String;
  image : String;*/

  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private modalCtrl: ModalController,private customerService : CustomerService, private viewCtrl: ViewController) {
  	this.navParams.get('data');
    this.title = this.navParams.get('type') + ' Details';
    this.createViews(this.navParams.get('data'));
    this.base_url = AppSettings.BASE_URL;
    
  }

  joinGroup(group_id, name){
    // call service...
    this.showLoading();
    console.log("Group clicked with ID "+group_id);

     var customer_id = window.localStorage.getItem('customer_id');

    var group = {'group_id': group_id, 'customer_id': customer_id, 'name': name}
    this.customerService.postJoinGroup(group).subscribe( response => {
        if (!response.error){
          this.loading.dismiss();
          this.showMessage(response.message);
          //this.navCtrl.push(Groups); 
                 
        }
    });
    this.loading.dismiss();
  }
  createViews(group) {
    this.selectedGroup = group;
    console.log(this.selectedGroup);
  }
  showMessage(text) {
    /*setTimeout(() => {
      //this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Groups',
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



