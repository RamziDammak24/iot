import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service'; // Import Firebase service
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-history',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  ledHistory: { date: string, action: string }[] = []; // History data to display

  private firebaseService = inject(FirebaseService);  // Inject Firebase service
  private router = inject(Router);  // Inject Router for navigation

  constructor() {}

  ngOnInit(): void {
    // Load LED history when component initializes
    this.loadHistory();
  }

  // Fetch LED history from Firebase
  loadHistory(): void {
    this.firebaseService.getLEDHistory().subscribe(
      (history: { date: string, action: string }[]) => {
        this.ledHistory = history; // Update the history array with fetched data
      },
      error => {
        console.error("Error loading LED history: ", error); // Handle errors
      }
    );
  }

  // Method to navigate back to the homepage
  goHome(): void {
    this.router.navigate(['/']);  // Navigate to the home page
  }
}
