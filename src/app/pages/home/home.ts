import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { Map } from '../../shared/map/map';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Map],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchLocation = '';

  private tripService = inject(TripService);
  private router = inject(Router);
  trips = this.tripService.getTripsSignal();
  tripCount = this.tripService.tripCount;
  selectTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }
}
