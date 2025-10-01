import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsiblePageRoutingModule } from './responsible-routing.module';

import { ResponsiblePage } from './responsible.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponsiblePageRoutingModule,
    HeaderComponentModule
  ],
  declarations: [ResponsiblePage]
})
export class ResponsiblePageModule {}
