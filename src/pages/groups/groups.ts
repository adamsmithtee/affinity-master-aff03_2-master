import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MyGroup } from '../my-group/my-group';
import { AllGroup } from '../all-group/all-group';

/**
 * Generated class for the Groups page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})

export class Groups {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = MyGroup;
    this.tab2 = AllGroup;
  }  

}
