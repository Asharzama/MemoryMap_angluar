import { Component, EventEmitter, input, output } from '@angular/core';

import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  imports: [],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss',
})
export class TripList {
  trips = input.required<Trip[]>();
  selectedTripId = input<string>();

  viewOnMap = output<Trip>();

  exploreTrip = output<Trip>();

  addTrip = output<void>();

  focusOnMap(trip: Trip): void {
    this.viewOnMap.emit(trip);
  }

  openTrip(trip: Trip): void {
    this.exploreTrip.emit(trip);
  }

  openAddTrip(): void {
    this.addTrip.emit();
  }
}
