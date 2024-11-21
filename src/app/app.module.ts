import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    AdminComponent,
    LoginComponent,
    MyOrderComponent,
    RegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule ,
    ToastrModule.forRoot({
      timeOut: 3000,           // Duration
      positionClass: 'toast-top-right', // Position
      preventDuplicates: true, // Prevent duplicates
      closeButton: true,       // Show close button
      progressBar: true,       // Show progress bar
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
