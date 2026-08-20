import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from './shared/navbar/navbar';
import { TripService } from './services/trip.service';
import { Trip } from './models/trip.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  appTitle = 'Travel Memory Map';

  searchLocation = '';

  trips: Trip[] = [];

  constructor(private tripService: TripService) {
    this.trips = this.tripService.getTrips();
  }
  getTripCount(): number {
    return this.tripService.getTripCount();
  }
  selectTrip(trip: Trip) {
    alert(`You selected ${trip.title}`);
  }
}
