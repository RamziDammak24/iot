import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseOptions } from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';

export const firebaseConfig :FirebaseOptions  = {
  apiKey: "AIzaSyCBbKLxS7mkO_4tZRR5EXYShKbsJehVXtI",
  authDomain: "projet-iot-4509b.firebaseapp.com",
  databaseURL: "https://projet-iot-4509b-default-rtdb.firebaseio.com",
  projectId: "projet-iot-4509b",
  storageBucket: "projet-iot-4509b.firebasestorage.app",
  messagingSenderId: "586734024536",
  appId: "1:586734024536:web:3702ebec49dedea8d7172d",
  measurementId: "G-DM2WGKD077"
};


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  private db: AngularFireDatabase = inject(AngularFireDatabase);


  private ledStatusPath = 'LEDStatus'; 
  private ledHistoryPath = 'History';

  constructor() {
    AngularFireModule.initializeApp(firebaseConfig); 
  }

  getLEDStatus(): Observable<any> {
    return this.db.object(this.ledStatusPath).valueChanges();
  }

  setLEDStatus(status: number): Promise<void> {
    return this.db.object(this.ledStatusPath).set(status);
  }

  getLEDHistory(): Observable<{ date: string, action: string }[]> {
    return this.db.list(this.ledHistoryPath).valueChanges() as Observable<{ date: string, action: string }[]>; 
  }


  saveLEDHistory(action: { date: string, action: string }) {
    return this.db.list(this.ledHistoryPath).push(action);
  }
}
