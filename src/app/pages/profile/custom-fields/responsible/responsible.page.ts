import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.page.html',
  styleUrls: ['./responsible.page.scss'],
  standalone: false
})
export class ResponsiblePage implements OnInit {
  groupId = localStorage.getItem('group_id') || '';
  responsibles: any[] = [];

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
      next: (data: any) => this.responsibles = data.responsibles,
      error: () => this.showToast('Erro ao carregar responsáveis', 'danger')
    });
  }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'Novo Responsável',
      inputs: [
        { name: 'id', type: 'text', placeholder: 'ID interno' },
        { name: 'name', type: 'text', placeholder: 'Nome do responsável' }
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
            this.service.createField(this.groupId, 'responsible', data).subscribe({
              next: () => {
                this.load();
                this.showToast('Responsável criado com sucesso.', 'success');
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
      header: 'Remover Responsável',
      message: `Deseja realmente remover "${item.name}"?`,
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
    this.service.deleteField(this.groupId, 'responsible', item.id).subscribe({
      next: () => {
        this.showToast('Responsável removida com sucesso.', 'success');
        this.load();
      },
      error: () => this.showToast('Erro ao remover', 'danger')
    });
  }

}
