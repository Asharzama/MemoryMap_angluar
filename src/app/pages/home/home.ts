import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchLocation = '';

  trips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private router: Router,
  ) {
    this.trips = this.tripService.getTrips();
  }
  selectTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }
}
