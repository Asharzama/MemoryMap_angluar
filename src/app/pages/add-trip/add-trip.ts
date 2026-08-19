import { Component, OnDestroy, inject } from '@angular/core';
import { LocationSelectionService } from '../../services/location-selection.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Trip, TripService } from '../../services/trip.service';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.scss',
})
export class AddTrip implements OnDestroy {
  private locationSelectionService = inject(LocationSelectionService);
  private uploadService = inject(UploadService);
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  uploadError = '';
  isUploading = false;
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

  private buildFormData(): FormData {
    const formValue = this.tripForm.getRawValue();

    const formData = new FormData();

    formData.append('title', formValue.title ?? '');

    formData.append('location', formValue.location ?? '');

    formData.append('latitude', String(formValue.latitude ?? ''));

    formData.append('longitude', String(formValue.longitude ?? ''));

    formData.append('date', formValue.date ?? '');

    formData.append('description', formValue.description ?? '');

    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });

    return formData;
  }

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

  onSubmit(): void {
    if (this.tripForm.invalid) {
      return;
    }

    this.isUploading = true;
    this.uploadError = '';

    const formData = this.buildFormData();

    this.uploadService.uploadTrip(formData).subscribe({
      next: (response) => {
        console.log('Upload response:', response);

        this.isUploading = false;
      },

      error: (error) => {
        console.error('Upload failed:', error);

        this.uploadError = 'Something went wrong while uploading your trip.';

        this.isUploading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.imagePreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  }
}
