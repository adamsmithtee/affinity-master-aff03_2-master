import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import {AuthService} from '../../services/authservice';
import {CustomerService} from '../../services/customer.service';
import { Dashboard } from '../dashboard/dashboard';
import { Signup } from '../signup/signup';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  rootPage : any;

  loading: Loading;

  signup = Signup;

  user:any;

  customer : any;

  details : any;

  usercreds = {
     username: '',
     password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthService, 
  private alertCtrl: AlertController, private loadingCtrl: LoadingController, private customerService : CustomerService, private events: Events) {
  }
  
  login(user) {
        this.showLoading();
        console.log('enter');
        this.authservice.authenticate(user).subscribe(response => {
            if (!response.error){
              //User login successfully...
              console.log("Successfully Logged in");
              this.user = response.user;

              if (this.isCustomer(this.user.group_id)){
                  // Its a Customer's Profile.. therefore redirect
                  console.log("Its a Customer's Profile");
                  
                /*this.getDetails(this.user.details_id);*/

                this.customerService.getCustomerDetails(this.user.details_id).subscribe(response => {
                    this.customer = response.customer;
                    localStorage.setItem('customer', JSON.stringify(this.customer));
                    
                    window.localStorage.setItem('membership', this.customer.membership);
                    window.localStorage.setItem('avatar', this.customer.avatar); 
                    window.localStorage.setItem('firstname', this.customer.firstname); 
                    window.localStorage.setItem('loggedIn', "true");
                    window.localStorage.setItem('user', this.user);
                    window.localStorage.setItem('customer_id', this.user.details_id);
                    window.localStorage.setItem('username', this.user.username);

                    this.events.publish('user:signedIn', this.customer);

                    console.log(response.customer);
                    console.log(JSON.stringify(this.customer));
                    
                  });

                  this.loading.dismiss();
                  this.navCtrl.push(Dashboard); 
                  
                  //this.rootPage = Dashboard; 
              }
              else{
                  // Not a Customer's Profile
                  console.log("Not a Customer's Profile");
                  this.showError("Only Customers can use this Application");

              }

            } 
          else{
            // User not logged in... Wrong credentials
            console.log(response);
            console.log("Wrong Credentials");
            this.showError("Wrong Credentials");
          }         
               
            });
               
    }

  getDetails(id){
    this.customerService.getCustomerDetails(id).subscribe(response => {
        this.details = response.customer;
        window.localStorage.setItem('customer_name', this.details.firstname + this.details.lastname);
        window.localStorage.setItem('avatar', this.details.avatar);
        window.localStorage.setItem('membership', this.details.membership);
        console.log(this.details);
    });
  }

  forgot(){
    var txt;
    var email = prompt("Please enter your email");
    if (email == null || email == "") {
        txt = "Process cancelled";
    } else {
        this.customerService.forgot(email).subscribe(response => {
        
        this.showMessage(response.message);
      });
    }
  }


    isCustomer(group_id){

      if (group_id == 1){
        return true;
      }

    }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Logging in...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showMessage(text) {
    
    let alert = this.alertCtrl.create({
      title: 'Password Recovery',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
    
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}

