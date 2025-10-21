import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroQuestionMarkCircle, heroBell, heroArrowRightOnRectangle, heroChevronDown } from '@ng-icons/heroicons/outline';
import { Avatar } from 'primeng/avatar';
import { NgClass } from '@angular/common';

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

  readonly userName = signal<string>('Augusto');
  readonly userAvatar = signal<string>('https://placehold.co/100x100');

  logout = () => {
    this.opened.set(false);
  }
}
