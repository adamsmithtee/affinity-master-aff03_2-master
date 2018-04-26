import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Loading} from 'ionic-angular';
import {GroupDetails} from '../group-details/group-details';

import {GroupService} from '../../services/group.service';
import {CustomerService} from '../../services/customer.service';
import {IGroup} from '../../interfaces/igroup';
import {IEvent} from '../../interfaces/ievent';
import {AppSettings} from '../../app/appSettings';
/**
 * Generated class for the MyGroup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-group',
  templateUrl: 'my-group.html',
})
export class MyGroup {

base_url : String;

  groups : IGroup[];

  customerGroups : IGroup[];

  events : IEvent[];

  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groupService: GroupService,
   private customerService: CustomerService, private alertCtrl: AlertController,  public toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    this.groups = [];
    this.getGroups();
    
    this.base_url = AppSettings.BASE_URL;
    this.getCustomerGroups();
  }


  ngOnInit(){
      this.getCustomerGroups();
  }  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
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


  viewDetails(name, details, avatar) {
    let alert = this.alertCtrl.create({
        title: name,
        message: "<br/><b>Details</b><br/>" + details, 

        buttons: ['Dismiss']
     });
     alert.present();
  }

  getGroups(){
        this.groupService.getGroups().subscribe(response => {
        this.groups = response.groups;
    },
      err => console.warn(err),
      () => {
        
      });
  }


  getCustomerGroups(){
      var customer_id = window.localStorage.getItem('customer_id');
      this.customerService.getJoinedGroups(customer_id).subscribe(response => {
        this.customerGroups = response.groups;

        
      }
      );

  }


  viewEvent(group_id){
  	this.groupService.getGroupEvents(group_id).subscribe( response => {
        this.events = response.events;
    });
  }

  joinGroup(group_id){
    this.showLoading();
    
     var customer_id = window.localStorage.getItem('customer_id');

    var group = {'group_id': group_id, 'customer_id': customer_id}
    this.customerService.postJoinGroup(group).subscribe( response => {
        if (!response.error){
          this.showMessage(response.message);
          this.loading.dismiss();
          //this.navCtrl.push(Groups);           
        }
    });
  }
  leaveGroup(group_id){
    this.showLoading();
    var customer_id = window.localStorage.getItem('customer_id');

    var group = {'group_id': group_id, 'customer_id': customer_id}
    this.customerService.leaveJoinGroup(group).subscribe( response => {
        if (!response.error){
          this.showMessage(response.message);
          
         this.getCustomerGroups();   
          this.loading.dismiss();      
        }
    });
  }

  showDetails(group){
    this.navCtrl.push(GroupDetails, {
        data: group
    });
  }

  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'MY GROUPS',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  ionViewWillEnter() {
    this.getCustomerGroups();
  }
  ionViewDidLoad() {
    this.getCustomerGroups();
  }

}
