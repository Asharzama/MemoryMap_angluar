import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Map } from '../../shared/map/map';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-details',
  imports: [RouterLink, Map],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss',
})
export class TripDetails {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);

  trip?: Trip;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.trip = this.tripService.getTripById(id);
  }
}
