import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';

@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
  standalone: false
})
export class TransactionModalComponent implements OnInit {
  @Input() transaction: any = null;

  transactionForm: FormGroup;
  isEditMode = false;

  loading = true;
  submitting = false;

  // Listas carregadas da API
  accounts: any[] = [];
  categories: any[] = [];
  responsibles: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private customFieldsService: CustomFieldsService,
    private alertCtrl: AlertController
  ) {
    this.transactionForm = this.fb.group({
      type: ['expense'],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      effect_date: ['', Validators.required],
      transaction_date: ['', Validators.required],
      category: [''],
      account: [''],
      sub_account: [''],
      responsible: ['']
    });
  }

  get accountControl(): FormControl {
    return this.transactionForm.get('account') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.transactionForm.get('category') as FormControl;
  }

  get responsibleControl(): FormControl {
    return this.transactionForm.get('responsible') as FormControl;
  }

  get accountOptions() {
    return this.accounts.map(a => ({ value: a.id, text: a.description }));
  }

  get categoryOptions() {
    return this.categories.map(c => ({ value: c.id, text: c.name }));
  }

  get responsibleOptions() {
    return this.responsibles.map(r => ({ value: r.id, text: r.name }));
  }

  ngOnInit() {

    const groupId = localStorage.getItem('group_id') || '';
  
    this.customFieldsService.getFields(groupId).subscribe({
      next: (res) => {
        this.accounts = res.accounts;
        this.categories = res.categories;
        this.responsibles = res.responsibles;
  
        if (this.transaction) {
          this.isEditMode = true;
          const id = this.transaction.SK?.split('#')[1];
          this.transactionForm.patchValue({ ...this.transaction, id });
        }
  
        this.loading = false; // ✅ Mostra o form após carregar tudo
      },
      error: () => {
        console.error('Erro ao carregar campos personalizados');
        this.loading = false;
      }
    });
  }  

    async submit() {
    if (this.transactionForm.invalid) return;

    this.submitting = true;

    const data = this.transactionForm.value;

    try {
        if (this.isEditMode) {
        const id = this.transaction.SK?.split('#')[1];
        await this.transactionService.updateTransaction(id, data).toPromise();
        } else {
        await this.transactionService.createTransaction(data).toPromise();
        }

        this.modalCtrl.dismiss(true);
    } catch (err) {
        console.error('Erro ao salvar transação', err);
    } finally {
        this.submitting = false;
    }
    }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Excluir transação',
      message: 'Deseja realmente excluir esta transação?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => this.delete()
        }
      ]
    });

    await alert.present();
  }

  async delete() {
    try {
      const id = this.transaction.SK?.split('#')[1];
      await this.transactionService.deleteTransaction(id).toPromise();
      this.modalCtrl.dismiss(true);
    } catch (err) {
      console.error('Erro ao excluir transação', err);
    }
  }

  close() {
    this.modalCtrl.dismiss(false);
  }
}
