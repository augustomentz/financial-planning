import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BoxComponent } from '../../components/box/box';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCreditCard, heroCurrencyDollar, heroDocumentText } from '@ng-icons/heroicons/outline';

interface FinancialTip {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [BoxComponent, NgIconComponent],
  providers: [MessageService],
  templateUrl: './plan.html',
  styleUrl: './plan.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroCreditCard, heroCurrencyDollar, heroDocumentText })]
})
export class PlanComponent {
  financialTips = signal<FinancialTip[]>([
    {
      icon: 'heroCurrencyDollar',
      title: 'Guardar R$ 50 este mês',
      description: 'A constância supera a intensidade: guardar pequenas quantias mensalmente cria um hábito financeiro poderoso que, com o tempo e os juros compostos, transforma o pouco em um grande patrimônio. É o pequeno esforço de hoje que garante a sua segurança e a realização dos seus sonhos amanhã.',
    },
    {
      icon: 'heroDocumentText',
      title: 'Pague uma conta com antecedência',
      description: 'Antecipar seus pagamentos elimina qualquer risco de multas ou juros por esquecimento, protegendo seu crédito e seu bolso. Além da economia, você ganha paz mental imediata, tirando a ansiedade de prazos pendentes da sua lista de preocupações diárias',
    },
    {
      icon: 'heroCreditCard',
      title: 'Auditar a Fatura do Cartão de Crédito',
      description: 'Revise linha por linha da sua fatura fechada em busca de cobranças duplicadas, assinaturas que você não usa mais ou possíveis fraudes. Essa inspeção mensal é vital para estancar gastos invisíveis e contestar erros bancários a tempo.',
    },
  ]);
}
