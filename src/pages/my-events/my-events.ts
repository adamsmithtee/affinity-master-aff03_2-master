import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, ToastController, Loading, NavParams } from 'ionic-angular';
import {EventDetails} from '../event-details/event-details';
import {AppSettings} from '../../app/appSettings';
import {EventService} from '../../services/event.service';
import {CustomerService} from '../../services/customer.service';
import {IEvent} from '../../interfaces/ievent';

/**
 * Generated class for the MyEvents page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEvents {
  base_url : String;

  events : IEvent[];

  customerEvents : IEvent[];

  eventsNot : IEvent[];

  eventsData : EventData[];

  loading : Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController,
  private eventService : EventService, private customerService : CustomerService) {
    this.events =[];
    this.eventsData = [];
    //this.getEvents();
    this.getCustomerEvents();
    this.base_url = AppSettings.BASE_URL;
    this.getCustomerEvents();
  }

  ngOnInit(){
        this.getCustomerEvents();
    };

/*  getEvents(){
        this.eventService.getEvents().subscribe(response => {
        this.events = response.events;

    });
  }*/

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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  viewDetails(name, description, location, date, end_date) {
    let alert = this.alertCtrl.create({
        title: name,
        message: "<br/><b>Description</b><br/>" + description + "<br/><br/><b>Location</b><br/>" + location + "<br/><br/>Date <br/>" + date + " to " + end_date, 

        buttons: ['Dismiss']
     });
     alert.present();
  }
  
  attending(event_id){
    console.log("Attending Event : "+ event_id);

    var customer_id = window.localStorage.getItem('customer_id');

    var event = {'event_id' : event_id, 'customer_id': customer_id};

    this.customerService.postJoinEvent(event).subscribe(response => {
        if (!response.error){
          this.showMessage(response.message);
          //this.navCtrl.push(EventPage);           
        }
    });
    //
  }
  leaveEvent(event_id){
    console.log("Attending Event : "+ event_id);
    this.showLoading();
    var customer_id = window.localStorage.getItem('customer_id');

    var event = {'event_id' : event_id, 'customer_id': customer_id};

    this.customerService.leaveJoinEvent(event).subscribe(response => {
        if (!response.error){
        this.loading.dismiss();
        this.getCustomerEvents();
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

  ionViewWillEnter() {
    this.getCustomerEvents();
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
      title: 'MY EVENTS',
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
