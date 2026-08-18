import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import * as L from 'leaflet';

import { Trip } from '../../services/trip.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges {
  @Input() trips: Trip[] = [];

  private map?: L.Map;

  private markers: L.Marker[] = [];

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
  }

  private renderMarkers(): void {
    if (!this.map) {
      return;
    }

    this.clearMarkers();

    const locations: L.LatLngExpression[] = [];

    this.trips.forEach((trip) => {
      const marker = L.marker([trip.latitude, trip.longitude]).addTo(this.map!).bindPopup(`
          <strong>${trip.title}</strong>
          <br>
          ${trip.location}
        `);

      this.markers.push(marker);

      locations.push([trip.latitude, trip.longitude]);
    });

    if (locations.length > 0) {
      this.map.fitBounds(L.latLngBounds(locations), {
        padding: [30, 30],
      });
    }
  }

  private clearMarkers(): void {
    this.markers.forEach((marker) => {
      marker.remove();
    });

    this.markers = [];
  }
}
