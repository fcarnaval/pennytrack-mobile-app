import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';

import { TransactionModalComponent } from './transaction-modal.component';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { PickerSelectComponentModule } from 'src/app/components/picker-select/picker-select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponentModule,
    ReactiveFormsModule,
    PickerSelectComponentModule
  ],
  declarations: [TransactionModalComponent],
  exports: [TransactionModalComponent]
})
export class TransactionModalModule {}
