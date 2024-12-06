import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { ProductManagementComponent } from './product-management/product-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to dashboard by default
      { path: 'dashboard', component: AdminDashboardComponent, canActivate:[AdminGuard] },
      { path: 'products', component: ProductManagementComponent, canActivate:[AdminGuard]},
      { path: 'category', component: CategoryManagmentComponent, canActivate:[AdminGuard] },
      // { path: 'category', component: CategoryManagmentComponent, canActivate:[AdminGuard] },
      {path : '**', component: AdminDashboardComponent, canActivate:[AdminGuard]}
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
