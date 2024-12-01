import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { ProductManagementComponent } from './product-management/product-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';

const routes: Routes = [
  {
    path: 'admin', // Base path will match `adminPanel` from AppRoutingModule
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: ProductManagementComponent },
      { path: 'category', component: CategoryManagmentComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
