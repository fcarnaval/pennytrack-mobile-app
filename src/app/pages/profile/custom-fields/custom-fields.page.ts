import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.page.html',
  styleUrls: ['./custom-fields.page.scss'],
  standalone: false
})
export class CustomFieldsPage implements OnInit {
  groupId = ''; // deve vir do estado global, auth ou localStorage
  accounts: any[] = [];
  categories: any[] = [];
  responsibles: any[] = [];

  constructor(
    private service: CustomFieldsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.groupId = localStorage.getItem('group_id') || '';
    this.loadFields();
  }

  loadFields() {
    if (!this.groupId) return;
    this.service.getFields(this.groupId).subscribe({
      next: (data: any) => {
        this.accounts = data.accounts;
        this.categories = data.categories;
        this.responsibles = data.responsibles;
      },
      error: () => this.showToast('Erro ao carregar listas', 'danger')
    });
  }

  async addField(type: 'account' | 'category' | 'responsible') {
    const label = {
      account: 'Nova Conta',
      category: 'Nova Categoria',
      responsible: 'Novo Responsável'
    }[type];

    const alert = await this.alertCtrl.create({
      header: label,
      inputs: [
        { name: 'id', type: 'text', placeholder: 'ID interno' },
        { name: 'name', type: 'text', placeholder: 'Nome/Descrição' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            if (!data.id || !data.name) {
              this.showToast('Preencha todos os campos.', 'warning');
              return false;
            }
            this.service.createField(this.groupId, type, data).subscribe({
              next: () => {
                this.showToast(`${label} criada com sucesso`, 'success');
                this.loadFields();
              },
              error: () => this.showToast('Erro ao salvar', 'danger')
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(msg: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2500, color });
    toast.present();
  }
}
