import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMap } from '@ng-icons/heroicons/outline';
import { heroArrowsRightLeftSolid, heroCalendarDaysSolid, heroSquares2x2Solid } from '@ng-icons/heroicons/solid';

type Option = {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroArrowsRightLeftSolid, heroSquares2x2Solid, heroCalendarDaysSolid, heroMap })]
})
export class SidebarComponent {
  options: Option[] = [
    { icon: 'heroArrowsRightLeftSolid', label: 'Dashboard', path: '/dashboard' },
    { icon: 'heroSquares2x2Solid', label: 'Transactions', path: '/transactions' },
    { icon: 'heroCalendarDaysSolid', label: 'Calendar', path: '/calendar' },
    { icon: 'heroMap', label: 'Plan', path: '/plan' },
  ]
}
