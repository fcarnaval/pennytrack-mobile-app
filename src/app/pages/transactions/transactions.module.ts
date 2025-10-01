import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { TransactionModalModule } from './transaction-modal/transaction-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    HeaderComponentModule,
    TransactionModalModule
  ],
  declarations: [TransactionsPage]
})
export class TransactionsPageModule {}
