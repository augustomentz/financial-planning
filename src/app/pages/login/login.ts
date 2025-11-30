import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputText, Button, ReactiveFormsModule, ToastModule, RouterLink],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  toast = inject(MessageService);
  loading = signal(false);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleLogin() {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);

    this.loginService.login(this.form.value.email!, this.form.value.password!).subscribe({
      next: (token) => {
        localStorage.setItem('financial_token', token.token);

        this.getUserInfo(token.token);

        this.loading.set(false);
      },
      error: (error) => {
        this.toast.add({ severity: 'error', summary: 'Login failed', detail: error.error.message });
        this.loading.set(false);
      }
    });
  }

  getUserInfo(token: string) {
    const id: string = jwtDecode(token).sub!;

    this.loginService.getUserInfo(id).subscribe({
      next: (user) => {
        localStorage.setItem('financial_user', JSON.stringify(user));

        this.router.navigate(['/dashboard']);
      },
    });
  }
}
