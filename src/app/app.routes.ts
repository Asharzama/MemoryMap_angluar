import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Home } from './pages/home/home';
import { Trips } from './pages/trips/trips';
import { AddTrip } from './pages/add-trip/add-trip';
import { TripDetails } from './pages/trip-details/trip-details';
import { EditTrip } from './pages/edit-trip/edit-trip';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'trips',
    component: Trips,
  },
  {
    path: 'add-trip',
    component: AddTrip,
    canActivate: [authGuard],
  },
  {
    path: 'trips/:id',
    component: TripDetails,
  },
  {
    path: 'trips/:id/edit',
    component: EditTrip,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
  },
];
