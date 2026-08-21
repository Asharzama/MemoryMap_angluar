import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';
import { Map } from '../../shared/map/map';
import { LocationSelectionService } from '../../services/location-selection.service';
import { LocationSearch } from '../../shared/location-search/location-search';
import { LocationResult } from '../../models/location-result';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Map, LocationSearch],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  searchLocation = '';
  selectedTripId?: string;
  @ViewChild(Map)
  mapComponent?: Map;
  selectTripOnMap(trip: Trip): void {
    this.selectedTripId = trip.id;
  }
  selectedLocation?: LocationResult;

  private locationSelectionService = inject(LocationSelectionService);
  private tripService = inject(TripService);
  private router = inject(Router);
  private demoService = inject(DemoService);

  trips = this.tripService.trips;
  tripCount = this.tripService.tripCount;
  visitedLocations = this.tripService.visitedLocations;

  selectTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }

  goToAddTrip(): void {
    this.router.navigate(['/add-trip']);
  }

  focusTripOnMap(trip: Trip): void {
    this.selectedTripId = trip.id;
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
