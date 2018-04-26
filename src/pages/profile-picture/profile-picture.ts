import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController, LoadingController, Loading, ActionSheetController, ToastController,Events } from 'ionic-angular';
import {AppSettings} from '../../app/appSettings';

import { Profile } from '../profile/profile';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import {AuthService} from '../../services/authservice';

declare var cordova: any;
/**
 * Generated class for the ProfilePicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-picture',
  templateUrl: 'profile-picture.html',
})
export class ProfilePicture {

  image: String;

  base_url: string;
  
  lastImage:  string = null;

  loading: Loading;

  user: any;

  user_details: any;

  details_id: any;

  subscriber_avatar: String;

  requested: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, public platform: Platform, private alertCtrl: AlertController, private events: Events, private loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private camera: Camera, private transfer: FileTransfer, private file: File, private filePath: FilePath, public authservice: AuthService) {
  	this.base_url = AppSettings.BASE_URL;
  	this.image = navParams.get('image');
  	this.user_details = navParams.get('user_details');
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
	    this.image = 'images/'+filename;
	    this.events.publish('user:updatedImage', 'images/'+filename);
	    this.presentToast('Profile picture updated succesfully');  
	    
	    
	  }, err => {
	    this.loading.dismissAll()
	    this.presentToast('Error while uploading file.');
	  });
  
	}
  

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProfilePicture');
    
  }

  	public closeModal(){
  		this.viewCtrl.dismiss();
	}
}
