import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Details} from '../details/details';
import 'rxjs/add/operator/map';
import {MerchantService} from '../../services/merchant.service';
import {IMerchant} from '../../interfaces/imerchant';
import { CallNumber } from '@ionic-native/call-number';

import {AppSettings} from '../../app/appSettings';
/**
 * Generated class for the Stores page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class Stores {

  base_url : String;
  merchants : IMerchant[];
  allCategories : any;
  public coordinates : String;
  sortedMerchants : any;

  loading: Loading;

  searchedParameter: any;

  category : any;

  data : any;

  mylat : any;

  mylong : any;

  


  constructor(public navCtrl: NavController, public navParams: NavParams, private merchantService : MerchantService, 
    private loadingCtrl: LoadingController, private geolocation: Geolocation, private callNumber: CallNumber, public platform: Platform) {
    this.base_url = AppSettings.BASE_URL;
  	this.merchants = [];
    this.getCategories();

    this.load();
    console.log(this.category);
    

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      this.mylat = resp.coords.latitude;
      console.log(resp.coords.longitude);
      this.mylong = resp.coords.longitude;
      this.coordinates = resp.coords.longitude + "," + resp.coords.latitude;
      
     }).catch((error) => {
       console.log('Error getting location', error);
       
     });
     
    
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  searchQuery: string = '';
  //items: string[];
  items: any[];
  container : any[];
  merchant_location: string;

  public initializeItems() {
    let lnglat = this.coordinates;
      this.items = [];
      this.container =[];


    


      
  }
  getSearchedMerchant(){
    if(!this.searchedParameter){
      if(!this.category){
        return new Promise(resolve => {  
          this.merchantService.getMerchantsAround().subscribe(response => {
            this.data = this.applyHaversine(response.merchants);
              this.data.sort((locationA, locationB) => {
              return locationA.distance - locationB.distance;
              
              });
              resolve(this.data);
            });
   
        });
      } 
    }
    if(this.searchedParameter =="" || this.searchedParameter ===null || this.searchedParameter =="undefined")
    {
      this.merchantService.getSearchedMerchants("undefined", this.category).subscribe(response => {
            this.data = (response.merchants);
            this.data = this.applyHaversine(response.merchants);
              this.data.sort((locationA, locationB) => {
              return locationA.distance - locationB.distance;
            });  
            console.log(this.data);
        
      });
    }
    else{
          this.merchantService.getSearchedMerchants(this.searchedParameter, this.category).subscribe(response => {
            this.data = (response.merchants);
            this.data = this.applyHaversine(response.merchants);
                this.data.sort((locationA, locationB) => {
                return locationA.distance - locationB.distance;
            });    
            console.log(this.data);
      
          });
        }  
  }

  getCategories(){  
    this.merchantService.getCategories().subscribe(response => {
          this.allCategories = (response.categories);
          console.log(this.allCategories);
    });    
  }    

  getMerchants(){
    this.merchantService.getMerchants().subscribe(response => {
        this.items = (response.merchants);
        console.log(this.items);
        this.container = this.items;
        this.merchant_location = response.merchants[0].country + " " + response.merchants[0].state + " " + response.merchants[0].city + " " + response.merchants[0].address;
        console.log(response.merchants);
        console.log(this.merchant_location);
    });
  }
  load(){
      
      
      if(this.data){
          return Promise.resolve(this.data);
      } 

      return new Promise(resolve => {  
        this.merchantService.getMerchantsAround().subscribe(response => {
          this.data = this.applyHaversine(response.merchants);
            this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
            
            });
            resolve(this.data);
          });
 
      });
 
    }
     
    applyHaversine(locations){
        
      /*Geolocation.getCurrentPosition().then(res => {
          this.mylat = res.coords.latitude
          this.mylong = res.coords.longitude
        }).catch((error) => {
          console.log('Error getting location', error);
        });*/

        let usersLocation = {
            lat: this.mylat,
            lng: this.mylong
        };

      /*  Geolocation.watchPosition().subscribe(position => {
          if ((position as Geoposition).coords != undefined) {
            var geoposition = (position as Geoposition);
            this.mylat = geoposition.coords.latitude;
            this.mylong = geoposition.coords.longitude;
          } else { 
            var positionError = (position as PositionError);
            console.log('Error ' + positionError.code + ': ' + positionError.message);
          }
        });*/


        locations.map((location) => {
 
            let placeLocation = {
                lat: location.latitude,
                lng: location.longitude
            };
 
            location.distance = this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'miles'
            ).toFixed(2);
        });
        
        console.log(locations);
        return locations;
        
      }
 
    getDistanceBetweenPoints(start, end, units){
 
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d;
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }
 
  

  showOnMap(addr){
    //http://maps.google.com/maps?q=24.197611,120.780512
    //window.open('maps://?q='+addr, '_system')
    window.open('http://maps.google.com/maps?q='+addr);
  }

  resetItems(){
    this.data = this.container;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    if (ev.target.value == "")
      this.resetItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  getLocations(ev: any) {
    // Reset items back to all of the items
    if (ev.target.value == "")
      this.resetItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.address.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  search(item) {
    this.merchantService.getSortedMerchants(item).subscribe(response => {
        this.sortedMerchants = (response.sortedMerchants);
        console.log(this.sortedMerchants.name);
        
    });
  }

  filterList(){

    if (this.category == '0'){
      this.resetItems();
    }else if(this.category && this.category.trim() != '') {
      this.data = this.container.filter((item) => {
        return (item.category_id == this.category);
      })
    }
  }

  call(number){
    this.callNumber.callNumber(number, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }  
  
  doRefresh(refresher) {
    this.initializeItems();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  sendCall(phone){
    window.open('tel:'+phone);
  }

  mailto(email) {
    this.platform.ready().then(() => {
        window.open('mailto:'+email);
    });
  }


  showItemDetails(selectedType, item){
    this.navCtrl.push(Details, {
        type: selectedType,
        data: item
    });
  }

  ionViewWillEnter(){
    this.load();
  }
  

}
