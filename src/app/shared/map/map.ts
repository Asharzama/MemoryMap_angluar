import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import * as L from 'leaflet';

import { Trip } from '../../models/trip.model';
import { LocationResult } from '../../models/location-result';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges {
  @Input() trips: Trip[] = [];

  @Input() selectedTripId?: string;

  @Output() tripSelected = new EventEmitter<Trip>();

  private map?: L.Map;

  private tripMarkers = new globalThis.Map<string, L.Marker>();

  private searchMarker?: L.Marker;

  ngAfterViewInit(): void {
    this.map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.renderMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trips']) {
      this.renderMarkers();
    }

    if (changes['selectedTripId'] && this.selectedTripId) {
      this.focusTrip(this.selectedTripId);
    }
  }

  private bindTripPopup(marker: L.Marker, trip: Trip): void {
    marker.bindPopup(`
    <div>
      <strong>${trip.title}</strong>
      <br>
      ${trip.location}
      <br><br>

      <button
        class="map-trip-button"
        data-trip-id="${trip.id}"
      >
        View Trip
      </button>
    </div>
  `);

    marker.on('popupopen', () => {
      const button = document.querySelector(`[data-trip-id="${trip.id}"]`);

      button?.addEventListener('click', () => {
        this.tripSelected.emit(trip);
      });
    });
  }

  private renderMarkers(): void {
    if (!this.map) {
      return;
    }

    this.clearMarkers();

    const locations: L.LatLngExpression[] = [];

    this.trips.forEach((trip) => {
      const marker = L.marker([trip.latitude, trip.longitude]).addTo(this.map!);

      this.bindTripPopup(marker, trip);

      marker.on('click', () => {
        this.tripSelected.emit(trip);
      });

      this.tripMarkers.set(trip.id, marker);

      locations.push([trip.latitude, trip.longitude]);
    });

    if (locations.length > 0) {
      this.map.fitBounds(L.latLngBounds(locations), {
        padding: [30, 30],
      });
    }
  }

  private clearMarkers(): void {
    this.tripMarkers.forEach((marker) => {
      marker.remove();
    });

    this.tripMarkers.clear();
  }

  focusTrip(tripId: string): void {
    if (!this.map) {
      return;
    }

    const trip = this.trips.find((item) => item.id === tripId);

    if (!trip) {
      return;
    }

    this.map.flyTo([trip.latitude, trip.longitude], 14);

    const marker = this.tripMarkers.get(tripId);

    if (marker) {
      marker.openPopup();
    }
  }

  goToLocation(result: LocationResult): void {
    if (!this.map) {
      return;
    }

    const latitude = Number(result.lat);

    const longitude = Number(result.lon);

    this.map.flyTo([latitude, longitude], 16);

    if (this.searchMarker) {
      this.searchMarker.remove();
    }

    this.searchMarker = L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(result.display_name)
      .openPopup();
  }
}
