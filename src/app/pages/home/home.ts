import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { Map } from '../../shared/map/map';
import { LocationSelectionService } from '../../services/location-selection.service';
import { LocationSearch } from '../../shared/location-search/location-search';
import { LocationResult } from '../../models/location-result';
import { DemoService } from '../../services/demo.service';
import { TripList } from '../../shared/trip-list/trip-list';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Map, LocationSearch, RouterLink, TripList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchLocation = '';
  selectedTripId?: string;
  @ViewChild(Map)
  mapComponent?: Map;

  selectedLocation?: LocationResult;

  private locationSelectionService = inject(LocationSelectionService);
  private tripService = inject(TripService);
  private router = inject(Router);
  private demoService = inject(DemoService);

  trips = this.tripService.trips;
  tripCount = this.tripService.tripCount;
  visitedLocations = this.tripService.visitedLocations;

  focusTripOnMap(trip: Trip): void {
    this.selectedTripId = trip.id;
  }

  selectTripOnMap(trip: Trip): void {
    this.selectedTripId = trip.id;
  }

  openTrip(trip: Trip): void {
    this.router.navigate(['/trips', trip.id]);
  }
  selectTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }

  goToAddTrip(): void {
    this.router.navigate(['/add-trip']);
  }

  addTripFromList(): void {
    this.router.navigate(['/add-trip']);
  }

  onLocationSelected(result: LocationResult): void {
    this.selectedLocation = result;

    this.locationSelectionService.setLocation(result);

    this.mapComponent?.goToLocation(result);
  }

  ngOnInit(): void {
    this.demoService.getMessage().subscribe((message) => {
      console.log(message);
    });
  }
}
