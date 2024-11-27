import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { ProductManagementComponent } from './product-management/product-management.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to the default admin route
      // { path: 'dashboard', component: DashboardComponent }, // Admin dashboard
      { path: 'products', component: ProductManagementComponent }, // Product management
      // { path: 'users', component: UserManagementComponent }, // User management
      // Add more routes as required
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
