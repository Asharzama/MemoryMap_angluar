import { computed, Injectable, signal, effect } from '@angular/core';
import { Trip } from '../models/trip.model';
import { CreateTrip } from '../models/create-trip.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  MOCK_TRIPS: Trip[] = [
    {
      id: 'trip-001',
      title: 'Dubai Desert Safari',
      location: 'Dubai, UAE',
      latitude: 25.2048,
      longitude: 55.2708,
      images: ['https://images.unsplash.com/photo-1518684079-3c830dcef090'],
      date: '2026-01-20',
      description: 'An amazing desert safari experience.',
    },

    {
      id: 'trip-002',
      title: 'Goa Beach',
      location: 'Goa, India',
      latitude: 15.4909,
      longitude: 73.8278,
      images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'],
      date: '2025-12-10',
      description: 'A relaxing beach trip.',
    },

    {
      id: 'trip-003',
      title: 'Ladakh Adventure',
      location: 'Ladakh, India',
      latitude: 34.1526,
      longitude: 77.5771,
      images: ['https://images.unsplash.com/photo-1500534623283-312aade485b7'],
      date: '2025-06-15',
      description: 'An unforgettable mountain adventure.',
    },
  ];

  constructor() {
    effect(() => {
      localStorage.setItem('travel-trips', JSON.stringify(this.tripsSignal()));
    });
  }
  
  getTrips$(): Observable<Trip[]> {
    return of(this.tripsSignal());
  }

  private tripsSignal = signal<Trip[]>(this.loadTrips());

  private loadTrips(): Trip[] {
    const stored = localStorage.getItem('travel-trips');

    if (!stored) {
      return this.MOCK_TRIPS;
    }

    try {
      return JSON.parse(stored) as Trip[];
    } catch {
      return this.MOCK_TRIPS;
    }
  }

  readonly trips = this.tripsSignal.asReadonly();

  getTripById(id: string): Trip | undefined {
    return this.tripsSignal().find((trip) => trip.id === id);
  }

  readonly tripCount = computed(() => this.tripsSignal().length);

  readonly visitedLocations = computed(() => {
    const locations = this.tripsSignal().map((trip) => trip.location);

    return new Set(locations).size;
  });

  getTrips(): Trip[] {
    return this.tripsSignal();
  }

  getTripCount(): number {
    return this.trips.length;
  }

  getTripsSignal() {
    return this.trips;
  }

  createTrip(data: CreateTrip): Trip {
    const newTrip: Trip = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.tripsSignal.update((currentTrips) => [...currentTrips, newTrip]);

    return newTrip;
  }

  updateTrip(id: string, changes: Partial<CreateTrip>): Trip | undefined {
    let updatedTrip: Trip | undefined;

    this.tripsSignal.update((currentTrips) => {
      return currentTrips.map((trip) => {
        if (trip.id !== id) {
          return trip;
        }

        updatedTrip = {
          ...trip,
          ...changes,
        };

        return updatedTrip;
      });
    });

    return updatedTrip;
  }

  deleteTrip(id: string): boolean {
    const currentTrips = this.tripsSignal();

    const exists = currentTrips.some((trip) => trip.id === id);

    if (!exists) {
      return false;
    }

    this.tripsSignal.update((trips) => trips.filter((trip) => trip.id !== id));

    return true;
  }

  searchTrips(query: string): Trip[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return this.tripsSignal();
    }

    return this.tripsSignal().filter(
      (trip) =>
        trip.title.toLowerCase().includes(normalizedQuery) ||
        trip.location.toLowerCase().includes(normalizedQuery) ||
        trip.description.toLowerCase().includes(normalizedQuery),
    );
  }
}
