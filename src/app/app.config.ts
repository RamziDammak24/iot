import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { routes } from './app.routes';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseConfig } from './firebase/firebase.service';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }
  ]
  
};
