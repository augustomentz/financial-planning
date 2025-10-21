import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BoxComponent } from './shared/box/box';
import { MenuComponent } from './shared/menu/menu';
import { SidebarComponent } from './shared/sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, BoxComponent, MenuComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly route = inject(ActivatedRoute);
  readonly title = signal('')

  onActivate() {
    this.title.set(this.route.firstChild?.snapshot.data['title'] ?? 'Page title not found');
  }
}
