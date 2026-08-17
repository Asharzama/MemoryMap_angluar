import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Trip } from '../../services/trip.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit, OnChanges {
  @Input() trips: Trip[] = [];
  private map!: L.Map;
  private markerLayer = L.layerGroup();
  private updateMarkers(): void {
    if (!this.map) {
      return;
    }

    this.markerLayer.clearLayers();

    const locations: L.LatLngExpression[] = [];

    this.trips.forEach((trip) => {
      const marker = L.marker([trip.latitude, trip.longitude]);

      marker
        .bindPopup(
          `
  <div class="map-popup">
    <strong>${trip.title}</strong>
    <br>
    📍 ${trip.location}
    <br>
    📅 ${trip.date}
  </div>
`,
        )
        .addTo(this.markerLayer);

      locations.push([trip.latitude, trip.longitude]);
    });

    this.markerLayer.addTo(this.map);

    if (locations.length > 0) {
      this.map.fitBounds(L.latLngBounds(locations), {
        padding: [30, 30],
      });
    }
  }

  ngAfterViewInit(): void {
    this.map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.updateMarkers();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trips']) {
      this.updateMarkers();
    }
  }
}
