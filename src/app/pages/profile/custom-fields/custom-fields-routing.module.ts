import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomFieldsPage } from './custom-fields.page';

const routes: Routes = [
  {
    path: '',
    component: CustomFieldsPage
  },  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'responsible',
    loadChildren: () => import('./responsible/responsible.module').then( m => m.ResponsiblePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomFieldsPageRoutingModule {}
