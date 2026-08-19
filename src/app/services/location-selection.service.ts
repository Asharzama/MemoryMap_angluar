import { Injectable, signal } from '@angular/core';
import { LocationResult } from '../models/location-result';

@Injectable({
  providedIn: 'root'
})
export class LocationSelectionService {

  private selectedLocation =
    signal<LocationResult | null>(null);

  readonly location =
    this.selectedLocation.asReadonly();

  setLocation(location: LocationResult): void {
    this.selectedLocation.set(location);
  }

  clearLocation(): void {
    this.selectedLocation.set(null);
  }
}