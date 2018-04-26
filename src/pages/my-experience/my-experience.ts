import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';

import {ExperienceDetails} from '../experience-details/experience-details';

import {ExperienceService} from '../../services/experience.service';
import {CustomerService} from '../../services/customer.service';
import {IExperience} from '../../interfaces/iexperience';
import {IEvent} from '../../interfaces/ievent';
import {AppSettings} from '../../app/appSettings';
/**
 * Generated class for the MyExperience page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-experience',
  templateUrl: 'my-experience.html',
})
export class MyExperience {

base_url : String;

  experiences : IExperience[];

  customerExperiences : IExperience[];

  events : IEvent[];

  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private experienceService: ExperienceService,
   private customerService: CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.experiences = [];
    this.base_url = AppSettings.BASE_URL;
    
  }

  ionViewWillEnter() {
    this.getCustomerExperiences();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  
  
  getCustomerExperiences(){
      this.showLoading();
      var customer_id = window.localStorage.getItem('customer_id');

      this.customerService.getJoinedExperiences(customer_id).subscribe(response => {
        this.loading.dismiss();
        this.customerExperiences = response.customer_experiences;
        //console.log("Get Data");
        //console.log(response);
        //console.log(JSON.stringify(this.customerExperiences));
      }
      );
      
  }

  openUrl(experience_id, price){
    var user_details_id = window.localStorage.getItem('customer_id');
    window.open("https://web.theaffinityclub.com/affinity/public/join_experience/" + experience_id + "/" + price + "/" + user_details_id, '_blank', 'location=yes');
  }
  /*
  viewEvent(group_id){
  	// View events associated with group
    console.log(group_id + "Group clicked");
    // call service to fetch events...
    this.groupService.getGroupEvents(group_id).subscribe( response => {
        this.events = response.events;
        console.log(this.events);
    });
  }
  */

  joinExperience(experience_id){
    // call service...
    this.showLoading();
    console.log("Experience clicked with ID "+experience_id);

     var customer_id = window.localStorage.getItem('customer_id');

    var experience = {'experience_id': experience_id, 'customer_id': customer_id}
    this.customerService.postJoinExperience(experience).subscribe( response => {
        if (!response.error){
          this.showMessage(response.message);
          this.loading.dismiss();
          //this.navCtrl.push(Experiences);           
        }
    });
    this.loading.dismiss();
  }

  leaveExperience(experience_id){
    // call service...
    this.showLoading();
    console.log("Experience clicked with ID "+experience_id);

     var customer_id = window.localStorage.getItem('customer_id');

    var experience = {'experience_id': experience_id, 'customer_id': customer_id}
    this.customerService.leaveJoinExperience(experience).subscribe( response => {
        if (!response.error){

          this.showMessage(response.message);
          this.loading.dismiss();
          this.getCustomerExperiences();
          //this.navCtrl.push(Experiences);           
        }
    });
    this.loading.dismiss();
  }

  showDetails(experience){
    this.navCtrl.push(ExperienceDetails, {
        data: experience
    });
  }

  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Experience',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Experience');
  }

}
