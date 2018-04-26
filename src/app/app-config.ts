import {InjectionToken} from '@angular/core';



export class AppConfig {
  apiEndpoint: string;
  title: string;
}

export const AFFINITY_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost/api/v1/',
  title: 'Affinity Mobile'
};

//export let APP_CONFIG = new InjectionToken<AppConfig>('app-config');
