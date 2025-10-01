import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomFieldsPageRoutingModule } from './custom-fields-routing.module';

import { CustomFieldsPage } from './custom-fields.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { CategoryPageModule } from './category/category.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomFieldsPageRoutingModule,
    HeaderComponentModule,
    CategoryPageModule
  ],
  declarations: [CustomFieldsPage]
})
export class CustomFieldsPageModule {}
