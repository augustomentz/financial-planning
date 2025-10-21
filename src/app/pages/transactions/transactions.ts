import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BoxComponent } from '../../components/box/box';
import { CurrencyPipe, NgClass } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TransactionPipe } from './transaction.pipe';

@Component({
  selector: 'app-transactions',
  imports: [BoxComponent, CurrencyPipe, NgClass, InputText, Button, FloatLabel, Select, InputNumber, TableModule, TransactionPipe],
  standalone: true,
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe, TransactionPipe],
})
export class TransactionsComponent {
  entry = signal<number>(3030);
  withdrawal = signal<number>(72.30);
  total = computed(() => this.entry() - this.withdrawal());

  transactionTypes = signal<{ label: string, value: string }[]>([
    { label: 'Entrada', value: 'entrada' },
    { label: 'Saída', value: 'saida' },
  ]);

  transactions = signal<{ entries: number, withdrawal: number, type: string }[]>([
    { entries: 100, withdrawal: 50, type: 'entrada' },
    { entries: 200, withdrawal: 100, type: 'saida' },
    { entries: 300, withdrawal: 150, type: 'saida' },
  ]);
}
