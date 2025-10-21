import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroArrowsRightLeftSolid, heroSquares2x2Solid, heroCalendarDaysSolid } from '@ng-icons/heroicons/solid';
import { NgIconComponent } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  viewProviders: [provideIcons({ heroArrowsRightLeftSolid, heroSquares2x2Solid, heroCalendarDaysSolid })]
})
export class SidebarComponent {
  options: Option[] = [
    { icon: 'heroArrowsRightLeftSolid', label: 'Dashboard', path: '/dashboard' },
    { icon: 'heroSquares2x2Solid', label: 'Transactions', path: '/transactions' },
    { icon: 'heroCalendarDaysSolid', label: 'Reports', path: '/reports' },
  ]
}
