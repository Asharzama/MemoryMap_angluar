import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CanLeavePage } from '../../guards/unsaved-changes';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-edit-trip',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.scss',
})
export class EditTrip implements CanLeavePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tripService = inject(TripService);

  trip?: Trip;

  tripForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    location: new FormControl('', [Validators.required]),

    latitude: new FormControl<number | null>(null, [Validators.required]),

    longitude: new FormControl<number | null>(null, [Validators.required]),

    date: new FormControl('', [Validators.required]),

    description: new FormControl(''),
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.trip = this.tripService.getTripById(id);

    if (!this.trip) {
      return;
    }

    this.tripForm.patchValue({
      title: this.trip.title,
      location: this.trip.location,
      latitude: this.trip.latitude,
      longitude: this.trip.longitude,
      date: this.trip.date,
      description: this.trip.description,
    });
  }

  onSubmit(): void {
    if (!this.trip || this.tripForm.invalid) {
      return;
    }

    const value = this.tripForm.getRawValue();

    this.tripService.updateTrip(this.trip.id, {
      title: value.title ?? '',
      location: value.location ?? '',
      latitude: value.latitude ?? 0,
      longitude: value.longitude ?? 0,
      date: value.date ?? '',
      description: value.description ?? '',
    });

    this.router.navigate(['/trips', this.trip.id]);
  }
  
  canDeactivate(): boolean {
    if (!this.tripForm.dirty) {
      return true;
    }

    return window.confirm('You have unsaved changes. Are you sure you want to leave?');
  }
}
