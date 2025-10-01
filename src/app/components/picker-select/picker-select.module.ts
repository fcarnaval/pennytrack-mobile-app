import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PickerSelectComponent } from './picker-select.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PickerSelectComponent],
  exports: [PickerSelectComponent]
})
export class PickerSelectComponentModule {}
