import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ActionSheetController, ToastController, Events} from 'ionic-angular';
import {ICustomer} from '../../interfaces/icustomer';
import {CustomerService} from '../../services/customer.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/authservice';
import { Dashboard } from '../dashboard/dashboard';
import {AppSettings} from '../../app/appSettings';
import {LocationService} from '../../services/location.service';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;
/**
 * Generated class for the UpdateProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfile {

  lastImage:  string = null;

  base_url : string;

  
  //customer : any;
  loading: Loading;

  customerData : any;

  countries: any;

  states: any;

  subscriber_avatar : any;

  details_id : any

  customer_id : string;

  toggleStatus : boolean;

    user = {
     username: '',
     details_id:'',
     password: ''
};

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private locationService: LocationService, 
   private customerService : CustomerService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public authservice: AuthService, public userService: UserService, public modalCtrl : ModalController, private camera: Camera, private transfer: FileTransfer, 
   private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, 
   public toastCtrl: ToastController, private events: Events) {
  }

  customer = {
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
          phone : '',
          password : '',
          avatar : ''
    };

  custAvatar = {
        avatar : ''
    };

  password = {
    password : '',
    newPassword : '',
    confirmPassword : ''
  };

  ngOnInit(){

    this.toggleStatus = false;   

    this.base_url = AppSettings.BASE_URL;

    this.customer.name = '';

    this.customer_id = window.localStorage.getItem('customer_id');

    this.customerService.getCustomerDetails(this.customer_id).subscribe(response => {
        this.customer = response.customer;

      

    

    
        
    });
  }

  getCountries (){
    this.locationService.getCountries().subscribe(response => {
        this.countries = response.countries;
        this.getStates1();
        console.log(response.countries);
    });
  }

  public openProfilePicture(){
        var data = { image : this.subscriber_avatar, user_details : this.customer_id};
        var ProfilePicture = this.modalCtrl.create('ProfilePicture',data);
        ProfilePicture.onDidDismiss(() =>{
        this.subscriber_avatar = window.localStorage.getItem('avatar');
        if(this.subscriber_avatar === "null"){
          this.subscriber_avatar =  'img/profile.png';
        } 
        else{
          this.subscriber_avatar = window.localStorage.getItem('avatar');
        }
        });
        ProfilePicture.present();
    }

  getStates (country){
    this.locationService.getStates(country).subscribe(response => {
        this.states = response.states;
    });
  }
  getStates1(){
    this.locationService.getStates(this.customer.country).subscribe(response => {
        this.states = response.states;
    });
  }



  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}


 
// Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;

    this.uploadImage();
  }, error => {
    this.presentToast('Error while storing file.');
  });
  
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

  public updateAvatar(){

   // this.showLoading();

  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);

  // File name only
  var filename = this.lastImage;

  alert(targetPath);
  
  this.customer.avatar = targetPath;


        this.customerService.updateCustomerAvatar(this.customer).subscribe(response => {
                        if (!response.error){
                          //Customer updated successfully...
                          console.log("Successfully updated avatar");
                          
                          this.showMessage(response.message);
                          
                          this.navCtrl.push(Dashboard);
                        } 
                        else{
                          // New Customer not created
                          console.log("Error updating customer");
                          this.showMessage("Error Updating");
                        }         
               
            });              




  }

public uploadImage() {
  // Destination URL
  var url = "https://web.theaffinityclub.com/upload.php";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
   
  this.details_id = window.localStorage.getItem('customer_id');  

  var options = {
    chunkedMode: false,
    fileKey: "file",
    fileName: filename,
    mimeType: "multipart/form-data",
    params : {'fileName': filename, 'user_details': this.details_id}
  };
 
  const fileTransfer: FileTransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });

  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll();
    window.localStorage.setItem('avatar', 'images/'+filename); 
    this.subscriber_avatar = 'images/'+filename;
    this.events.publish('user:updatedImage', 'images/'+filename);
    this.presentToast('Profile picture updated succesfully');  
    
    
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
  
}

  updatePassword(password){
    this.showLoading();

    console.log(password);

        // Check of password is corrrect

        this.user.username = window.localStorage.getItem('username');

        this.user.details_id = window.localStorage.getItem('customer_id');

        this.user.password = password.password;

        console.log(this.user);

  this.authservice.authenticate(this.user).subscribe(response => {
            if (!response.error){
              //User login successfully...
              console.log("Successfully Logged in: Can now update");

              this.user.password = password.newPassword; // Change Password to new password after successful login...

        this.userService.updateUser(this.user).subscribe(response => {
                        if (!response.error){
                          //Customer updated successfully...
                          console.log("Successfully updated");
                          this.showMessage(response.message);
                          
                          this.navCtrl.push(Dashboard);
                        } 
                        else{
                          // Password not updated
                          console.log("Error updating password");
                          this.showMessage("Error Updating");
                        }         
               
            });              

            } 
          else{
            // User not logged in... Wrong credentials
            console.log(response);
            console.log("Wrong Password");
            this.showMessage("Wrong Password");
            this.loading.dismiss();
          }         
               
            });


        // End Check


  }

  update(customer) {
        this.showLoading();

        console.log(customer);

        // Check of password is corrrect

        this.user.username = window.localStorage.getItem('username');

        this.user.password = customer.password;

        console.log(this.user);

  this.authservice.authenticate(this.user).subscribe(response => {
            if (!response.error){
              //User login successfully...
              console.log("Successfully Logged in: Can now update");

        this.customerService.updateCustomer(customer).subscribe(response => {
                        if (!response.error){
                          //Customer updated successfully...
                          console.log("Successfully updated");
                          this.showMessage(response.message);
                          window.localStorage.setItem('customer_name', customer.name);
                          this.navCtrl.push(Dashboard);
                        } 
                        else{
                          // New Customer not created
                          console.log("Error updating customer");
                          this.showMessage("Error Updating");
                        }         
               
            });              

            } 
          else{
            // User not logged in... Wrong credentials
            console.log(response);
            console.log("Wrong Password");
            this.showMessage("Wrong Password");
            this.loading.dismiss();
          }         
               
            });


        // End Check

               
    }

 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Updating...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {

    
  }

  ionViewWillEnter() {
    this.getCountries(); 
    this.subscriber_avatar = window.localStorage.getItem('avatar');
    if(this.subscriber_avatar === "null"){
      this.subscriber_avatar =  'img/profile.png';
    } 
    else{
      this.subscriber_avatar = window.localStorage.getItem('avatar');
    }
  }

  showMessage(text) {
    /*setTimeout(() => {
      this.loading.dismiss();
    });*/
 
    let alert = this.alertCtrl.create({
      title: 'Profile Update',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
