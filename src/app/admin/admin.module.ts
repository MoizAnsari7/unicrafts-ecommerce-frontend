import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { RouterModule } from '@angular/router';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [ 
    AdminComponent,
    ProductManagementComponent,
    ProductModalComponent,
    CategoryManagmentComponent,
    AdminDashboardComponent, 
  ],
 
  imports: [
    CommonModule,
    ReactiveFormsModule,
     RouterModule.forChild([
      { path: '', component: AdminComponent }
    ]),
    AdminRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule { }
