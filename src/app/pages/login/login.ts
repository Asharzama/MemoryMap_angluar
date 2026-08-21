import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';

  login(): void {
    this.authService.login(this.email, this.password);

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    this.router.navigateByUrl(returnUrl || '/');
  }
}
