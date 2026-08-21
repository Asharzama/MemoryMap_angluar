import { Component, HostListener, Input, signal } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  imports: [],
  templateUrl: './image-gallery.html',
  styleUrl: './image-gallery.scss',
})
export class ImageGallery {
  @Input() images: string[] = [];
  @HostListener('document:keydown.escape')
  handleEscape(): void {
    this.closeImage();
  }

  @HostListener('document:keydown.arrowright')
  handleArrowRight(): void {
    if (this.selectedIndex() !== null) {
      this.nextImage();
    }
  }

  selectedIndex = signal<number | null>(null);

  openImage(index: number): void {
    this.selectedIndex.set(index);
  }

  closeImage(): void {
    this.selectedIndex.set(null);
  }

  nextImage(): void {
    const currentIndex = this.selectedIndex();

    if (currentIndex === null || this.images.length === 0) {
      return;
    }

    const nextIndex = (currentIndex + 1) % this.images.length;

    this.selectedIndex.set(nextIndex);
  }

  previousImage(): void {
    const currentIndex = this.selectedIndex();

    if (currentIndex === null || this.images.length === 0) {
      return;
    }

    const previousIndex = (currentIndex - 1 + this.images.length) % this.images.length;

    this.selectedIndex.set(previousIndex);
  }
}
