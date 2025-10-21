import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-box',
  imports: [],
  standalone: true,
  templateUrl: './box.html',
  styleUrl: './box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  classList = input<string>('');
}
