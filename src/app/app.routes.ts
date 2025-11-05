import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
