import { AfterViewInit, Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map implements AfterViewInit {
  ngAfterViewInit(): void {
    const locations: L.LatLngExpression[] = [
      [25.2048, 55.2708],
      [15.4909, 73.8278],
      [34.1526, 77.5771],
    ];

    const map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    locations.forEach((location) => {
      L.marker(location).addTo(map);
    });

    map.fitBounds(L.latLngBounds(locations));
  }
}
