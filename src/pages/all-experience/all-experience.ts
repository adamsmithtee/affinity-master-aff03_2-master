import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,  LoadingController, Loading} from 'ionic-angular';

import {ExperienceDetails} from '../experience-details/experience-details';

import {ExperienceService} from '../../services/experience.service';
import {CustomerService} from '../../services/customer.service';
import {IExperience} from '../../interfaces/iexperience';
import {IEvent} from '../../interfaces/ievent';
import {AppSettings} from '../../app/appSettings';

/**
 * Generated class for the AllEperience page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-experience',
  templateUrl: 'all-experience.html',
})
export class AllExperience {

base_url : String;

  experiences : IExperience[];

  customerExperiences : IExperience[];

  experience_id : String;

  price : String;

  events : IEvent[];

  loading: Loading;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, private experienceService: ExperienceService,
   private customerService: CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.experiences = [];
    this.getExperiences();
    this.base_url = AppSettings.BASE_URL;
    
  }

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


  getExperiences(){
        this.showLoading();
        this.experienceService.getExperiences().subscribe(response => {
        this.loading.dismiss();
        this.experiences = response.experiences;
        console.log(response.experiences);
        
    },
      err => console.warn(err),
      () => {
        this.loading.dismiss();
      });
  }

  viewDetails(name, overview, country, state, start_date, end_date, details, ntk, price) {
    let alert = this.alertCtrl.create({
        title: name,
        message: "<b>Details</b><br/>" + details + "<br/><br/><b>Overview</b><br/>" + overview + "<br/><br/><b>Need to know</b><br/>" + ntk + "<br/><br/><b>Price</b><br/>" + price + "<br/><br/><b>Location</b><br/>" + country + " " + state + "<br/><br/>Form " +start_date + " to " + end_date, 

        buttons: ['Dismiss']
     });
     alert.present();
}
  
  


  getCustomerExperiences(){
      var customer_id = window.localStorage.getItem('customer_id');

      this.customerService.getJoinedExperiences(customer_id).subscribe(response => {
        this.customerExperiences = response.experiences;
        console.log("Get Data");
        console.log(response);
        console.log(JSON.stringify(this.customerExperiences));
      });
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

  showDetails(experience){
    this.navCtrl.push(ExperienceDetails, {
        data: experience
    });
  }

  joinExperience(experience_id){
    // call service...

    console.log("Experience clicked with ID "+experience_id);
    this.showLoading();
     var customer_id = window.localStorage.getItem('customer_id');

    var experience = {'experience_id': experience_id, 'customer_id': customer_id}
    this.customerService.postJoinExperience(experience).subscribe( response => {
        if (!response.error){
          this.loading.dismiss();
          this.showMessage(response.message);
          //this.navCtrl.push(Experiences);           
        }
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

}
