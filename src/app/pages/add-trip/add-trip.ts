import { Component, inject } from '@angular/core';
import { LocationSelectionService } from '../../services/location-selection.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.scss',
})
export class AddTrip {
  private locationSelectionService = inject(LocationSelectionService);

  selectedLocation = this.locationSelectionService.location;

  tripForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    location: new FormControl('', [Validators.required]),

    latitude: new FormControl<number | null>(null, [Validators.required]),

    longitude: new FormControl<number | null>(null, [Validators.required]),

    date: new FormControl('', [Validators.required]),

    description: new FormControl(''),
  });

  constructor(private tripService: TripService) {
    const location = this.selectedLocation();

    if (location) {
      this.tripForm.patchValue({
        location: location.display_name,
        latitude: Number(location.lat),
        longitude: Number(location.lon),
      });
    }
  }

  onSubmit() {
    if (this.tripForm.invalid) {
      return;
    }

    const formValue = this.tripForm.getRawValue();

    const newTrip: Trip = {
      id: Date.now(),

      title: formValue.title ?? '',

      location: formValue.location ?? '',

      latitude: formValue.latitude ?? 0,

      longitude: formValue.longitude ?? 0,

      date: formValue.date ?? '',

      description: formValue.description ?? '',

      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    };

    this.tripService.addTrip(newTrip);

    console.log('Trip added:', newTrip);

    this.tripForm.reset();

    this.locationSelectionService.clearLocation();
  }
}
