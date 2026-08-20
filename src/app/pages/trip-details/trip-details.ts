import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Map } from '../../shared/map/map';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-details',
  imports: [RouterLink, Map],
  templateUrl: './trip-details.html',
  styleUrl: './trip-details.scss',
})
export class TripDetails {
  private route = inject(ActivatedRoute);
  private tripService = inject(TripService);
  private router = inject(Router);

  trip?: Trip;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.trip = this.tripService.getTripById(id);
  }

  deleteTrip(): void {
    if (!this.trip) {
      return;
    }

    const confirmed = window.confirm(`Delete "${this.trip.title}"?`);

    if (!confirmed) {
      return;
    }

    this.tripService.deleteTrip(this.trip.id);

    this.router.navigate(['/trips']);
  }
}
