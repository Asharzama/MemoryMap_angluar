import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { Home } from './pages/home/home';
import { Trips } from './pages/trips/trips';

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
    canActivate: [authGuard],
    loadComponent: () => import('./pages/add-trip/add-trip').then((m) => m.AddTrip),
  },
  {
    path: 'trips/:id/edit',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('./pages/edit-trip/edit-trip').then((m) => m.EditTrip),
  },
  {
    path: 'trips/:id',
    loadComponent: () => import('./pages/trip-details/trip-details').then((m) => m.TripDetails),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
];
