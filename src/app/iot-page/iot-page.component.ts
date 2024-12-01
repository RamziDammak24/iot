import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service'; // Import Firebase service

@Component({
  selector: 'app-iot-page',
  standalone: true,
  templateUrl: './iot-page.component.html',
  styleUrls: ['./iot-page.component.css']
})
export class IotPageComponent implements OnInit {

  ledState: 'ON' | 'OFF' = 'OFF'; // LED state (either ON or OFF)

  private firebaseService = inject(FirebaseService);  // Inject FirebaseService

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to LED state updates from Firebase
    this.firebaseService.getLEDStatus().subscribe((status: number) => {
      this.ledState = status === 1 ? 'ON' : 'OFF'; // Update LED state based on Firebase value
    });
  }

  // Toggle the LED state (turn ON or OFF) and update Firebase
  toggleLED(): void {
    const newStatus = this.ledState === 'ON' ? 0 : 1; // Switch state: 0 for OFF, 1 for ON

    // Save LED history with the current timestamp and action
    const action = newStatus === 1 ? 'Allumé' : 'Éteint';
    const date = new Date();
    const formattedDate = date.toISOString().replace(/T/, '-').replace(/\..+/, '');
    
    // Call the Firebase service to save the history
    this.firebaseService.saveLEDHistory({ date: formattedDate, action }).then(() => {
      // Update the LED status in Firebase after saving the history
      this.firebaseService.setLEDStatus(newStatus).then(() => {
        this.ledState = newStatus === 1 ? 'ON' : 'OFF'; // Update UI state after successful Firebase update
      });
    });
  }

  // Navigate to the LED history page
  goToHistory(): void {
    this.router.navigate(['/history']); // Navigate to history page
  }
}
