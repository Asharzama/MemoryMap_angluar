import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.scss'
})
export class AddTrip {

  tripForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    location: new FormControl('', [
      Validators.required
    ]),

    date: new FormControl('', [
      Validators.required
    ]),

    description: new FormControl('')
  });

  constructor(private tripService: TripService) {}

  onSubmit() {
  if (this.tripForm.invalid) {
    return;
  }

  const formValue = this.tripForm.getRawValue();

  const newTrip: Trip = {
    id: Date.now(),
    title: formValue.title ?? '',
    location: formValue.location ?? '',
    date: formValue.date ?? '',
    description: formValue.description ?? '',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7'
  };

  this.tripService.addTrip(newTrip);

  console.log('Trip added:', newTrip);

  this.tripForm.reset();
}
}