import { Injectable } from '@angular/core';

export interface Trip {
  id: number;
  title: string;
  location: string;
  image: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private trips: Trip[] = [
    {
      id: 1,
      title: 'Dubai Desert Safari',
      location: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090',
      date: '2026-01-20',
    },
    {
      id: 2,
      title: 'Goa Beach',
      location: 'Goa, India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      date: '2025-12-10',
    },
    {
      id: 3,
      title: 'Ladakh Adventure',
      location: 'Ladakh, India',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
      date: '2025-06-15',
    },
  ];

  getTripById(id: number): Trip | undefined {
    return this.trips.find((trip) => trip.id === id);
  }

  getTrips(): Trip[] {
    return this.trips;
  }

  getTripCount(): number {
    return this.trips.length;
  }
}
