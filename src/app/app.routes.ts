import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
    data: {
      title: 'Register'
    }
  },
  {
    path: '',
    loadComponent: () => import('./pages/main/main').then(m => m.MainComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'transactions',
        loadComponent: () => import('./pages/transactions/transactions').then(m => m.TransactionsComponent),
        data: {
          title: 'Entradas e Saídas'
        }
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar').then(m => m.Calendar),
        data: {
          title: 'Calendário'
        }
      }
    ]
  }
];
