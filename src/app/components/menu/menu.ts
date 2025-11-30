import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQuestionMarkCircle, heroBell, heroArrowRightOnRectangle, heroChevronDown } from '@ng-icons/heroicons/outline';
import { Avatar } from 'primeng/avatar';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [NgIconComponent, Avatar, NgClass],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroQuestionMarkCircle, heroBell, heroArrowRightOnRectangle, heroChevronDown })]
})
export class MenuComponent {
  private router = inject(Router);
  readonly title = input.required<string>();

  readonly icons = [
    {
      name: 'heroQuestionMarkCircle',
      size: 20
    },
    {
      name: 'heroBell',
      size: 20
    }
  ]

  readonly opened = signal<boolean>(false);

  readonly userName = signal<string>(JSON.parse(localStorage.getItem('financial_user') || '{}').name || '');
  readonly userAvatar = signal<string>('https://placehold.co/100x100');


  logout = () => {
    this.opened.set(false);

    this.router.navigate(['/login']);

    localStorage.removeItem('financial_token');
    localStorage.removeItem('financial_user');
  }
}
