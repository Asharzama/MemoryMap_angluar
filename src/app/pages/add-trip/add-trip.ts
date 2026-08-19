import { Component, OnDestroy, inject } from '@angular/core';
import { LocationSelectionService } from '../../services/location-selection.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.scss',
})
export class AddTrip implements OnDestroy {
  private locationSelectionService = inject(LocationSelectionService);
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  uploadError = '';
  selectedLocation = this.locationSelectionService.location;
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  tripForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),

    location: new FormControl('', [Validators.required]),

    latitude: new FormControl<number | null>(null, [Validators.required]),

    longitude: new FormControl<number | null>(null, [Validators.required]),

    date: new FormControl('', [Validators.required]),

    description: new FormControl(''),
  });

  private clearPreviewUrls(): void {
    this.imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    this.imagePreviews = [];
  }

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

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }
    this.clearPreviewUrls();
    this.uploadError = '';

    const files = Array.from(input.files);

    const invalidFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isSmallEnough = file.size <= this.MAX_FILE_SIZE;

      return !isImage || !isSmallEnough;
    });

    if (invalidFiles.length > 0) {
      this.uploadError = 'Some files were skipped. Images must be 5 MB or smaller.';
    }

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith('image/');
      const isSmallEnough = file.size <= this.MAX_FILE_SIZE;

      return isImage && isSmallEnough;
    });

    this.selectedFiles = validFiles;

    this.imagePreviews = validFiles.map((file) => URL.createObjectURL(file));
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

      images: ['https://images.unsplash.com/photo-1500534623283-312aade485b7'],
    };

    this.tripService.addTrip(newTrip);

    console.log('Trip added:', newTrip);

    this.tripForm.reset();

    this.locationSelectionService.clearLocation();
  }

  ngOnDestroy(): void {
    this.imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }
}
