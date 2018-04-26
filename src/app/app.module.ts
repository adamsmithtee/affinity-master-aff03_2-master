import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';

import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CallNumber } from '@ionic-native/call-number';

import { MyApp } from './app.component';
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
import { Groups } from '../pages/groups/groups';
import { Card } from '../pages/card/card';
import { Experiences } from '../pages/experiences/experiences';
import { Offers } from '../pages/offers/offers';
import { Subscription } from '../pages/subscription/subscription';
import { Details } from '../pages/details/details';
import { GroupDetails } from '../pages/group-details/group-details';
import { OfferDetails } from '../pages/offer-details/offer-details';
import { EventDetails } from '../pages/event-details/event-details';
import { ExperienceDetails } from '../pages/experience-details/experience-details';
import {About} from '../pages/about/about';
import {Review} from '../pages/review/review';

import { MyGroup } from '../pages/my-group/my-group';
import { AllGroup } from '../pages/all-group/all-group';
import { MyEvents } from '../pages/my-events/my-events';
import { AllEvents } from '../pages/all-events/all-events';
import { MyExperience } from '../pages/my-experience/my-experience';
import { AllExperience } from '../pages/all-experience/all-experience';

import {AuthService} from '../services/authservice';
import {InterestService} from '../services/interest.service';
import {LocationService} from '../services/location.service';
import {CustomerService} from '../services/customer.service';
import {MerchantService} from '../services/merchant.service';
import {GroupService} from '../services/group.service';
import {ExperienceService} from '../services/experience.service';
import {EventService} from '../services/event.service';
import {UserService} from '../services/user.service';
import {TransactionService} from '../services/transaction.service';
import {OfferService} from '../services/offer.service';
import {SubscriptionService} from '../services/subscription.service';

import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Signup,
    Dashboard,
    Profile,
    Claim,
    Card,
    Transactions,
    EventPage,
    UpdateProfile,
    Stores,
    Groups,
    Experiences,
    MyExperience,
    AllExperience,
    Offers,
    Subscription,
    MyGroup,
    AllGroup,
    MyEvents,
    AllEvents,
    Details,
    GroupDetails,
    OfferDetails,
    EventDetails,
    ExperienceDetails,
    About,
    Review
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Signup,
    Dashboard,
    Profile,
    Claim,
    Card,
    Transactions,
    EventPage,
    UpdateProfile,
    Stores,
    Groups,
    Offers,
    Subscription,
    MyGroup,
    AllGroup,
    MyEvents,
    AllEvents,
    Experiences,
    MyExperience,
    AllExperience,
    Details,
    GroupDetails,
    OfferDetails,
    EventDetails,
    ExperienceDetails,
    About,
    Review
  ],
  providers: [
    AuthService,
    InterestService,
    LocationService,
    CustomerService,
    GroupService,
    MerchantService,
    EventService,
    ExperienceService,
    UserService,
    TransactionService,
    OfferService,
    SubscriptionService,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    SocialSharing,
    File,
    FileTransfer,
    Camera,
    FilePath,
    Geolocation,
    ScreenOrientation,
    CallNumber,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
