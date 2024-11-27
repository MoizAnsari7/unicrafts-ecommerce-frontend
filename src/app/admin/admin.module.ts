import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { RouterModule } from '@angular/router';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    AdminComponent,
    ProductManagementComponent,
    ProductModalComponent, 
  ],
 
  imports: [
    CommonModule,
    ReactiveFormsModule,
     RouterModule.forChild([
      { path: '', component: AdminComponent }
    ]),
    AdminRoutingModule
  ]
})
export class AdminModule { }
