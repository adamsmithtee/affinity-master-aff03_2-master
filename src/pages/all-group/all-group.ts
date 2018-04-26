import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Loading} from 'ionic-angular';

import {GroupDetails} from '../group-details/group-details';

import {GroupService} from '../../services/group.service';
import {CustomerService} from '../../services/customer.service';
import {IGroup} from '../../interfaces/igroup';
import {IEvent} from '../../interfaces/ievent';
import {AppSettings} from '../../app/appSettings';

/**
 * Generated class for the AllGroup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-group',
  templateUrl: 'all-group.html',
})
export class AllGroup {

base_url : String;

  groups : IGroup[];

  customerGroups : IGroup[];

  events : IEvent[];

  loading: Loading; 

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private groupService: GroupService,
   private customerService: CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.groups = [];
    this.getGroups();
    this.getCustomerGroups();
    this.base_url = AppSettings.BASE_URL;
    /*this.showLoading();*/
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  getGroups(){
        this.showLoading();
        this.groupService.getGroups().subscribe(response => {
        this.groups = response.groups;
        this.loading.dismiss();
    },
      err => console.warn(err),
      () => {
        this.loading.dismiss();
      });
  }

  viewDetails(name, details, avatar) {
    let alert = this.alertCtrl.create({
        title: name,
        message: "<br/><b>Details</b><br/>" + details, 

        buttons: ['Dismiss']
     });
     alert.present();
  }


  getCustomerGroups(){
      var customer_id = window.localStorage.getItem('customer_id');

      this.customerService.getJoinedGroups(customer_id).subscribe(response => {
        this.customerGroups = response.groups;
        console.log("Get Data");
        console.log(response);
        console.log(JSON.stringify(this.customerGroups));
      });
  }


  viewEvent(group_id){
    // View events associated with group
    console.log(group_id + "Group clicked");
    // call service to fetch events...
    this.groupService.getGroupEvents(group_id).subscribe( response => {
        this.events = response.events;
        console.log(this.events);
    });
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


  showDetails(group){
    this.navCtrl.push(GroupDetails, {
        type: group.name,
        data: group
    });
  }
  
  showDirective(){
    this.presentToast('Slide left to open');
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
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

}
