import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip, TripService } from '../../services/trip.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  imports: [RouterLink],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss',
})
export class TripDetails {
  trip: Trip | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.trip = this.tripService.getTripById(id);
  }
}
