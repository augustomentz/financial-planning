import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { BoxComponent } from '../../components/box/box';
import { MenuComponent } from '../../components/menu/menu';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, BoxComponent, MenuComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = signal('')

  onActivate() {
    this.title.set(this.route.firstChild?.snapshot.data['title'] ?? 'Page title not found');
  }
 }
