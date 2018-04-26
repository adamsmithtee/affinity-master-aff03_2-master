import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyEvents } from '../my-events/my-events';
import { AllEvents } from '../all-events/all-events';

/**
 * Generated class for the EventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-page',
  templateUrl: 'event-page.html',
})
export class EventPage {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab2 = AllEvents;
    this.tab1 = MyEvents;
    
  }  

}
