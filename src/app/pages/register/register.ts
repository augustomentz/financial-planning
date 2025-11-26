import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputText, Button, ReactiveFormsModule, ToastModule, RouterLink],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent	 {
  formBuilder = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);
  toast = inject(MessageService);
  loading = signal(false);

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  handleRegister() {
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);

    this.loginService.register(this.form.value.name!, this.form.value.email!, this.form.value.password!).subscribe({
      next: (user) => {
        this.toast.add({ severity: 'success', summary: 'Register successful', detail: 'Please login to continue' });

        this.router.navigate(['/login']);

        this.loading.set(false);
      },
      error: (error) => {
        this.toast.add({ severity: 'error', summary: 'Register failed', detail: error.error.message });

        this.loading.set(false);
      }
    });
  }
}
