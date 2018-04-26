import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyExperience } from '../my-experience/my-experience';
import { AllExperience } from '../all-experience/all-experience';

/**
 * Generated class for the Experiences page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-experiences',
  templateUrl: 'experiences.html',
})

export class Experiences {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = AllExperience;
    this.tab2 = MyExperience;
  }  

}
