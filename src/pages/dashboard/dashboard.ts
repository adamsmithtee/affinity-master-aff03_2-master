import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { Profile } from '../profile/profile';
import { Claim } from '../claim/claim';
import { EventPage } from '../event-page/event-page';
import {UpdateProfile} from '../update-profile/update-profile';
import { Stores } from '../stores/stores';
import { Groups } from '../groups/groups';
import { Offers } from '../offers/offers';
import {Login} from '../login/login';

import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
	claim = Claim;
	events = EventPage;


	tab1: any;
	tab2: any;
	tab3: any;
	tab4: any;

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, 
  public navParams: NavParams, public platform: Platform, private socialSharing: SocialSharing) {
  	this.tab1 = Profile;
    this.tab2 = Claim;
    this.tab3 = EventPage;
    this.tab4 = Stores;
  }

  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.share("Hi friend, Check out Affinity App", null, "www/assets/images/LOGO.png", null); 
  }

  /**
   * This share's directly via twitter using the:
   * shareViaTwitter(message, image, url)
   */
  twitterShare(){
    this.socialSharing.shareViaTwitter("Hi friend, Check out Affinity App", "www/assets/images/LOGO.png", null); 
  }

  /**
   * This share's directly via Instagram using:
   * shareViaInstagram(message, image)
   */
  instagramShare(){
    this.socialSharing.shareViaInstagram("Hi friend, Check out Affinity App", "www/assets/images/LOGO.png"); 
  }

  /**
   * This share's directly via whatsapp using the:
   * shareViaWhatsapp(message, image, url)
   */
  whatsappShare(){
    this.socialSharing.shareViaWhatsApp("Hi friend, Check out Affinity App", "www/assets/images/LOGO.png", null); 
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Menu',
      buttons: [
        {
          text: 'Groups',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'people' : null,
          handler: () => {
            this.navCtrl.push(Groups);
          }
        },{
          text: 'Events',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'star' : null,
          handler: () => {
            //this.navCtrl.setRoot(events);
            this.navCtrl.push(EventPage);
          }
        }
        /*,{
          text: 'Subscription',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'lock' : null,
          handler: () => {
            console.log('Subscription clicked');
          }
        }*/,{
          text: 'Offers',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'heart' : null,
          handler: () => {
            console.log('Offers clicked');
            this.navCtrl.push(Offers);
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');

            this.regularShare();
          }
        },
        {
          text: 'Update Profile',
          icon: !this.platform.is('ios') ? 'person' : null,
          handler: () => {
            console.log('Profile update clicked');
            this.navCtrl.push(UpdateProfile);
          }
        },
        {
          text: 'Logout',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'lock' : null,
          handler: () => {
            console.log('Logout clicked');
            window.localStorage.clear();
            this.navCtrl.push(Login);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
