import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { ModalController } from '@ionic/angular';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';
import { TransactionFilterModalComponent } from './transaction-filter-modal/transaction-filter-modal.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: false,
})
export class TransactionsPage implements OnInit {
    allTransactions: any[] = [];
    transactions: any[] = [];
  
    loading = false;
    filters = {
      category: '',
      account: '',
      responsible: '',
      startDate: '',
      endDate: ''
    };
  
    categories: any[] = [];
    accounts: any[] = [];
    responsibles: any[] = [];

  constructor(
    private transactionService: TransactionService,
    private customFieldsService: CustomFieldsService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadCustomFields();
  }
  
  loadCustomFields() {
    const groupId = localStorage.getItem('group_id') || '';
    this.customFieldsService.getFields(groupId).subscribe({
      next: res => {
        this.categories = res.categories;
        this.accounts = res.accounts;
        this.responsibles = res.responsibles;
      }
    });
  }

  loadTransactions() {
    this.loading = true;
    this.transactionService.getTransactions().subscribe({
      next: data => {
        this.allTransactions = data;
        this.applyFilters();
        this.loading = false;
      },
      error: err => {
        console.error('Erro ao buscar transações', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.transactions = this.allTransactions.filter(t => {
      const matchCategory = !this.filters.category || t.category === this.filters.category;
      const matchAccount = !this.filters.account || t.account === this.filters.account;
      const matchResponsible = !this.filters.responsible || t.responsible === this.filters.responsible;

      const matchStartDate = !this.filters.startDate || t.effect_date >= this.filters.startDate;
      const matchEndDate = !this.filters.endDate || t.effect_date <= this.filters.endDate;

      return matchCategory && matchAccount && matchResponsible && matchStartDate && matchEndDate;
    });
  }

  clearFilters() {
    this.filters = {
      category: '',
      account: '',
      responsible: '',
      startDate: '',
      endDate: ''
    };
    this.applyFilters();
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: TransactionModalComponent
    });

    modal.onDidDismiss().then(res => {
      if (res.data === true) {
        this.loadTransactions();
      }
    });

    await modal.present();
  }

  async editTransaction(transaction: any) {
    const id = transaction.SK?.split('#')[1];
    const modal = await this.modalCtrl.create({
      component: TransactionModalComponent,
      componentProps: {
        transaction: {
          ...transaction,
          id
        }
      }
    });
  
    modal.onDidDismiss().then(res => {
      if (res.data === true) {
        this.loadTransactions();
      }
    });
  
    await modal.present();
  }

  async openFilterModal() {
    const modal = await this.modalCtrl.create({
        component: TransactionFilterModalComponent,
        componentProps: {
        filters: { ...this.filters },
        categories: this.categories,
        accounts: this.accounts,
        responsibles: this.responsibles
        }
    });

    modal.onDidDismiss().then(res => {
        if (res.data !== null) {
        this.filters = res.data;
        this.applyFilters();
        }
    });

    await modal.present();
  }
  
}
