import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// url path /common/oauth2/v2.0/authorize
export const routes: Routes = [
    {
        path: '**',
        component: AppComponent,
      },
        
];
