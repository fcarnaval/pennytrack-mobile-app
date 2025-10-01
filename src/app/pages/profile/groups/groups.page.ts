import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: false
})
export class GroupsPage implements OnInit {
  groups: any[] = [];
  selectedGroupId: string = localStorage.getItem('group_id') || '';

  constructor(
    private groupService: GroupService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getMyGroups().subscribe({
      next: (res) => this.groups = res,
      error: (err) => console.error('Erro ao buscar grupos', err)
    });
  }

  async openCreateGroup() {
    const alert = await this.alertCtrl.create({
      header: 'Novo Grupo',
      inputs: [{ name: 'name', type: 'text', placeholder: 'Nome do grupo' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Criar',
          handler: data => this.createGroup(data.name)
        }
      ]
    });

    await alert.present();
  }

  createGroup(name: string) {
    if (!name) return;

    this.groupService.createGroup(name).subscribe({
      next: () => this.loadGroups(),
      error: (err) => console.error('Erro ao criar grupo', err)
    });
  }

  async abrirConvite(grupo: any) {
    if (grupo.role !== 'admin') return;

    const alert = await this.alertCtrl.create({
      header: `Convidar para ${grupo.name}`,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail do usuário'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Convidar',
          handler: (data) => {
            const email = data.email;
            if (!email) return;

            this.groupService.findUserByEmail(email).subscribe({
              next: res => {
                const userId = res.user_id;
                this.groupService.inviteUser(grupo.group_id, userId).subscribe({
                  next: () => {
                    this.toastCtrl.create({
                      message: 'Usuário convidado com sucesso.',
                      duration: 3000,
                      color: 'success'
                    }).then(t => t.present());
                  },
                  error: err => {
                    console.error('Erro ao convidar:', err);
                    this.toastCtrl.create({
                      message: 'Erro ao convidar usuário.',
                      duration: 3000,
                      color: 'danger'
                    }).then(t => t.present());
                  }
                });
              },
              error: err => {
                console.error('Erro ao buscar usuário:', err);
                this.toastCtrl.create({
                  message: 'Usuário não encontrado.',
                  duration: 3000,
                  color: 'warning'
                }).then(t => t.present());
              }
            });

            return false; // evita fechamento automático caso ocorra erro
          }
        }
      ]
    });

    await alert.present();
  }

  setDefaultGroup(groupId: string) {
    localStorage.setItem('group_id', groupId);
  
    this.groupService.setDefaultGroup(groupId).subscribe({
      next: () => {
        this.groups.forEach(g => g.default = g.group_id === groupId);
        this.showToast('Grupo definido como padrão.');
      },
      error: () => this.showToast('Erro ao definir grupo padrão.', 'danger')
    });
  }  

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color
    });
    toast.present();
  }

}
