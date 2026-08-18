import { Component, EventEmitter, inject, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { LocationResult } from '../../models/location-result';

import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-search',
  imports: [FormsModule],
  templateUrl: './location-search.html',
  styleUrl: './location-search.scss',
})
export class LocationSearch {
  private locationService = inject(LocationService);
  @Output() locationSelected = new EventEmitter<LocationResult>();
  searchText = '';
  
  selectLocation(result: LocationResult): void {
    this.locationSelected.emit(result);

    this.results = [];
    this.searchText = result.display_name;
  }

  results: LocationResult[] = [];

  search(): void {
    const query = this.searchText.trim();

    if (!query) {
      this.results = [];
      return;
    }

    this.locationService.searchLocation(query).subscribe((results) => {
      this.results = results;
    });
  }
}
