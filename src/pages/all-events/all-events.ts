import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import {EventDetails} from '../event-details/event-details';

import {AppSettings} from '../../app/appSettings';
import {EventService} from '../../services/event.service';
import {CustomerService} from '../../services/customer.service';
import {IEvent} from '../../interfaces/ievent';

/**
 * Generated class for the AllEvents page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-events',
  templateUrl: 'all-events.html',
})
export class AllEvents {
  base_url : String;

  events : IEvent[];

  loading : Loading;

  customerEvents : IEvent[];

  eventsNot : IEvent[];

  eventsData : EventData[];

  constructor(public navCtrl: NavController,  public toastCtrl: ToastController, public navParams: NavParams, private alertCtrl: AlertController,
  private eventService : EventService, private customerService : CustomerService, private loadingCtrl: LoadingController) {
    this.events =[];
    this.eventsData = [];
    this.getEvents();
    this.getCustomerEvents();
    this.base_url = AppSettings.BASE_URL;
  }

  ngOnInit(){

    };

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
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

  getEvents(){
        this.showLoading();
        console.log(this.base_url);
        this.eventService.getEvents().subscribe(response => {
        this.loading.dismiss();
        this.events = response.events;
        console.log(JSON.stringify(response.events));


    });
  }  
  
  viewDetails() {
    let alert = this.alertCtrl.create({
        title: "",
        message: "Slide left to open", 

        buttons: ['Ok. Got it!']
     });
     alert.present();
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

  getCustomerEvents(){
      var customer_id = window.localStorage.getItem('customer_id');

      this.customerService.getJoinedEvents(customer_id).subscribe(response => {
        this.customerEvents = response.events;
        console.log("Get Data");
        console.log(JSON.stringify(this.customerEvents));
      });
  }

  viewEvent(){
  	this.showMessage("You will see the event details");
  }

  showDetails(event){
    this.navCtrl.push(EventDetails, {
        data: event
    });
  }


  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Events',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}

interface EventData{
  event : IEvent;
  attending : boolean;
}
