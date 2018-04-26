import {Component, ViewChild} from '@angular/core';
import { Platform, Nav, Events , ToastController, AlertController} from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Profile } from '../pages/profile/profile';
import { Claim } from '../pages/claim/claim';
import { Transactions } from '../pages/transactions/transactions';
import { EventPage } from '../pages/event-page/event-page';
import {UpdateProfile} from '../pages/update-profile/update-profile';
import { Stores } from '../pages/stores/stores';
import { Card } from '../pages/card/card';
import { Groups } from '../pages/groups/groups';
import { Experiences } from '../pages/experiences/experiences';
import { Offers } from '../pages/offers/offers';
import { Subscription } from '../pages/subscription/subscription';
import { About } from '../pages/about/about';


import { MyGroup } from '../pages/my-group/my-group';
import { AllGroup } from '../pages/all-group/all-group';

import { MyExperience } from '../pages/my-experience/my-experience';
import { AllExperience } from '../pages/all-experience/all-experience';

import {AppSettings} from './appSettings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  private homePage;
  private merchantPage;
  private groupPage;
  private experiencePage;
  private eventPage;
  private offerPage;
  private claimPage;
  private cardPage;
  private transactionsPage;
  private subscriptionPage;
  private profilePage;
  private helpPage;

  name : String;

  username : any;

  membership : any;

  customer : any;

  email : any;

  base_url : String;

  subscriber_avatar : String;

  @ViewChild(Nav) nav: Nav;

  platform : any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events, private toastCtrl:   ToastController, private alertCtrl: AlertController) {
    
    platform.ready().then(()=>{
       platform.registerBackButtonAction(()=>this.myHandlerFunction());
       
    })
          

          
    events.subscribe('user:signedIn', (userEventData) => {
      this.subscriber_avatar = userEventData.avatar; 
      this.name = userEventData.firstname;
      this.membership = userEventData.membership;  
    });

    events.subscribe('user:updatedImage', (userEventData) => {
      this.subscriber_avatar = userEventData; 
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.homePage = Dashboard;
      this.merchantPage = Stores;
      this.groupPage = Groups;
      this.experiencePage = Experiences;
      this.eventPage = EventPage;
      this.offerPage = Offers;
      this.claimPage = Claim;
      this.cardPage = Card;
      this.transactionsPage = Transactions;
      this.subscriptionPage = Subscription;
      this.profilePage = UpdateProfile;
      this.helpPage = About;

      this.base_url = AppSettings.BASE_URL;

      if (window.localStorage.getItem('loggedIn')){
          this.customer = localStorage.getItem('customer');
          this.name = window.localStorage.getItem('firstname');
          this.membership = window.localStorage.getItem('membership');
          if(this.membership === "null" || this.membership == ""){
            this.membership =  '';
          } 
          
          this.subscriber_avatar = window.localStorage.getItem('avatar');
          if(this.subscriber_avatar === "null"){
            this.subscriber_avatar =  'img/profile.png';
          } 
          else{
            this.subscriber_avatar = window.localStorage.getItem('avatar');
          }
          console.log(this.customer);
          this.rootPage = Dashboard;
          
      } 
      else{
        this.rootPage = Login;
      }


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page){
    this.rootPage = page;
  }



  logout(){
    localStorage.clear();
    this.rootPage = Login;
  }

  myHandlerFunction(){

      let alert = this.alertCtrl.create({
        title: 'Confirm Exit',
        message: 'Are you sure you want to exit this app?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },
          {
            text: 'Exit',
            handler: () => {
              navigator['app'].exitApp();     
            }
          }
        ]
      });
      alert.present();


     
  }

  
}

