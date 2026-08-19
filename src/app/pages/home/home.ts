import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';
import { Router } from '@angular/router';
import { Map } from '../../shared/map/map';
import { LocationSearch } from '../../shared/location-search/location-search';
import { LocationResult } from '../../models/location-result';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Map, LocationSearch],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchLocation = '';
  @ViewChild(Map)
  mapComponent?: Map;
  selectedLocation?: LocationResult;
  private tripService = inject(TripService);
  private router = inject(Router);
  trips = this.tripService.getTripsSignal();
  tripCount = this.tripService.tripCount;
  selectTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }
  onLocationSelected(result: LocationResult): void {
    this.selectedLocation = result;

    this.mapComponent?.goToLocation(result);
  }
}
