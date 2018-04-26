import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

import { Login } from '../login/login';
import {InterestService} from '../../services/interest.service';

import { Camera } from '@ionic-native/camera';

import {LocationService} from '../../services/location.service';

import {CustomerService} from '../../services/customer.service';
import {INewCustomer} from '../../interfaces/inewcustomer';
import { FileChooser } from '@ionic-native/file-chooser';
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  interestsData: any;

  countriesData: any;

  statesData: any;

  avatar:any;

  login = Login;

  loading: Loading;

  customer : INewCustomer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private interestService: InterestService, private locationService: LocationService, 
 public customerService: CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController  ) {
  }

  ngOnInit(){
    this.customer = {
          username : '',
          firstname :'',
          lastname : '',  
          dob : '',  
          name : '',
          email : '',
          address: '',
          country: '',
          state: '',
          city: '',
          membership: '',
          sex: '',
          confirm_password:'',
          phone : '',
          password : '',
          agreement_checkbox: "false",
          interests: []
    };
    this.getInterests();
    this.getCountries();
  }

  getInterests(){
    this.interestService.getInterests().subscribe(response => {
        this.interestsData = response.interests;
    });
  }
  openTandC(){
    window.open("https://theaffinityclub.com/terms-and-conditions", '_blank', 'location=yes');
  }

  getCountries (){
    this.locationService.getCountries().subscribe(response => {
        this.countriesData = response.countries;
    });
  }

  getStates (country){
    this.locationService.getStates(country).subscribe(response => {
        this.statesData = response.states;
    });
  }

  
  upload(file){

    
  }    

 
  signup(customer) {
        this.showLoading();
        if(this.customer.agreement_checkbox == 'false'){
          let alert = this.alertCtrl.create({
            title: 'Confirm',
            subTitle: 'You must agree to The Affinity Club terms and conditions',
            buttons: ['OK']
          });
          alert.present(prompt);
          this.loading.dismiss();
          return;

        }
      if(this.customer.password !== this.customer.confirm_password){
          let alert = this.alertCtrl.create({
              title: 'Confirm',
              subTitle: 'Password does not match!',
              buttons: ['OK']
          });
          alert.present(prompt);
          this.loading.dismiss();
          return;

      }
        console.log(customer);
        this.customer.username = this.customer.email;
        this.customerService.postCustomer(customer).subscribe(response => {
          this.loading.dismiss();
          if (!response.error){
            //Customer created successfully...
            this.showInfo();
            console.log("Successfully created");
            this.navCtrl.setRoot(Login); 
          } else{
            // New Customer not created
            console.log("Error creating customer");
            this.showError("Error Signing up");
          }       
             
        });
               
    }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Creating Profile...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Signup Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


  showInfo() {
    //this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Account Created',
      message: 'Pls go ahead and login',
      buttons: ['OK']
    });
    alert.present(prompt);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

}
