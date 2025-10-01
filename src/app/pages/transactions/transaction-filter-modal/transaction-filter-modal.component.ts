import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-transaction-filter-modal',
  templateUrl: './transaction-filter-modal.component.html',
  styleUrls: ['./transaction-filter-modal.component.scss'],
  imports: [ IonicModule, CommonModule, FormsModule ],
  standalone: true
})
export class TransactionFilterModalComponent {
  @Input() filters: any = {};
  @Input() categories: any[] = [];
  @Input() accounts: any[] = [];
  @Input() responsibles: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  apply() {
    this.modalCtrl.dismiss(this.filters);
  }

  clear() {
    this.modalCtrl.dismiss({
      category: '',
      account: '',
      responsible: '',
      startDate: '',
      endDate: ''
    });
  }

  close() {
    this.modalCtrl.dismiss(null);
  }
}
