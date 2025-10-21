import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-transactions',
  imports: [],
  standalone: true,
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent { }
