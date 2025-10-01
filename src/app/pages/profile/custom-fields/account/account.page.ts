import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  groupId = localStorage.getItem('group_id') || '';
  accounts: any[] = [];

  constructor(
    private service: CustomFieldsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    if (!this.groupId) return;
    this.service.getFields(this.groupId).subscribe({
      next: (data: any) => this.accounts = data.accounts,
      error: () => this.showToast('Erro ao carregar contas', 'danger')
    });
  }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'Nova Conta',
      inputs: [
        { name: 'id', type: 'text', placeholder: 'ID interno' },
        { name: 'name', type: 'text', placeholder: 'Descrição da conta' }
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
            this.service.createField(this.groupId, 'account', {
              id: data.id,
              name: data.name // será mapeado como "description"
            }).subscribe({
              next: () => {
                this.load();
                this.showToast('Conta criada com sucesso.', 'success');
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

  async confirmDelete(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Remover Conta',
      message: `Deseja realmente remover "${item.description}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => this.delete(item)
        }
      ]
    });
  
    await alert.present();
  }
  
  delete(item: any) {
    this.service.deleteField(this.groupId, 'account', item.id).subscribe({
      next: () => {
        this.showToast('Conta removida com sucesso.', 'success');
        this.load();
      },
      error: () => this.showToast('Erro ao remover', 'danger')
    });
  }

}
