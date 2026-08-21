import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  imports: [],
  templateUrl: './trip-list.html',
  styleUrl: './trip-list.scss',
})
export class TripList {
  @Input() trips: Trip[] = [];

  @Input() selectedTripId?: string;

  @Output() viewOnMap = new EventEmitter<Trip>();

  @Output() exploreTrip = new EventEmitter<Trip>();

  @Output() addTrip = new EventEmitter<void>();

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
