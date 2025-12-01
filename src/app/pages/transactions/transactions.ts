import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BoxComponent } from '../../components/box/box';
import { CurrencyPipe, NgClass } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TransactionPipe } from './transaction.pipe';
import { TransactionsService } from './transactions.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

export type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
}

export type TransactionsInfo = {
  credit: number;
  debit: number;
  total: number;
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Component({
  selector: 'app-transactions',
  imports: [BoxComponent, CurrencyPipe, NgClass, InputText, Button, FloatLabel, Select, InputNumber, TableModule, TransactionPipe, ReactiveFormsModule, DatePickerModule],
  standalone: true,
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe, TransactionPipe],
})
export class TransactionsComponent {
  transactions = inject(TransactionsService);
  formBuilder = inject(FormBuilder);

  transactionTypes = signal<{ label: string, value: string }[]>([
    { label: 'Entrada', value: TransactionType.CREDIT },
    { label: 'Saída', value: TransactionType.DEBIT },
  ]);

  transactionsData = signal<Transaction[]>([])
  transactionsInfo = signal<TransactionsInfo>({
    credit: 0,
    debit: 0,
    total: 0,
  });

  form = this.formBuilder.group({
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.transactions
      .info()
      .subscribe((info) => this.transactionsInfo.set(info));

    this.transactions
      .get()
      .subscribe((transactions) => this.transactionsData.set(transactions));
  }

  handleAddTransaction() {
    const type = this.form.value.type as unknown as { label: string, value: string };

    this.transactions.add({
      amount: this.form.value.amount,
      description: this.form.value.description,
      type: type.value
    } as unknown as Transaction).subscribe(() => {
      this.form.reset();
      this.transactions.get().subscribe((transactions) => this.transactionsData.set(transactions));
    });
  }
}
