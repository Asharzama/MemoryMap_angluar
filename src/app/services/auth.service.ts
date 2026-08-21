import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = signal(false);

  readonly isAuthenticated = this.authenticated.asReadonly();

  login(email: string, password: string): void {
    if (email.trim() && password.trim()) {
      this.authenticated.set(true);

      localStorage.setItem('auth-token', 'fake-token');
    }
  }

  logout(): void {
    this.authenticated.set(false);

    localStorage.removeItem('auth-token');
  }
}
