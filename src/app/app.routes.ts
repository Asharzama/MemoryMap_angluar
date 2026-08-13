import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Trips } from './pages/trips/trips';
import { AddTrip } from './pages/add-trip/add-trip';
import { TripDetails } from './pages/trip-details/trip-details';

export const routes: Routes = [
    {
    path: '',
    component: Home
  },
  {
    path: 'trips',
    component: Trips
  },
  {
    path: 'add-trip',
    component: AddTrip
  },
  {
  path: 'trips/:id',
  component: TripDetails
}
];
