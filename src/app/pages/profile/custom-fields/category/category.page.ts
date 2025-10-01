import { Component, OnInit } from '@angular/core';
import { CustomFieldsService } from 'src/app/services/custom-fields.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: false
})
export class CategoryPage implements OnInit {
  groupId = localStorage.getItem('group_id') || '';
  categories: any[] = [];

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
      next: (data: any) => this.categories = data.categories,
      error: () => this.showToast('Erro ao carregar categorias', 'danger')
    });
  }

  async add() {
    const alert = await this.alertCtrl.create({
      header: 'Nova Categoria',
      inputs: [
        { name: 'id', type: 'text', placeholder: 'ID interno' },
        { name: 'name', type: 'text', placeholder: 'Nome da categoria' }
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
            this.service.createField(this.groupId, 'category', data).subscribe({
              next: () => {
                this.load();
                this.showToast('Categoria criada com sucesso.', 'success');
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
      header: 'Remover Categoria',
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
    this.service.deleteField(this.groupId, 'category', item.id).subscribe({
      next: () => {
        this.showToast('Categoria removida com sucesso.', 'success');
        this.load();
      },
      error: () => this.showToast('Erro ao remover', 'danger')
    });
  }
  
}
