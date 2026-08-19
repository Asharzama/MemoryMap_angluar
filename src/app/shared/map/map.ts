import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LocationResult } from '../../models/location-result';
import * as L from 'leaflet';

import { Trip } from '../../services/trip.service';

const defaultIcon = L.icon({
  iconUrl: 'assets/leaflet/marker-icon.png',
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges {
  
  @Input() trips: Trip[] = [];
  private searchMarker?: L.Marker;
  private map?: L.Map;

  private markers: L.Marker[] = [];

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
      .bindPopup(
        `
    <strong>Selected Location</strong>
    <br>
    ${result.display_name}
  `,
      )
      .openPopup();
  }

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
