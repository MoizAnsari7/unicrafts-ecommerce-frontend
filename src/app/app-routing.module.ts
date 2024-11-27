import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'adminPanel', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent , canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'my-order', component: MyOrderComponent , canActivate:[AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent , canActivate:[AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
